import React, { createContext, useContext, useState, useEffect } from 'react';
import { services as servicesApi, projects as projectsApi, team as teamApi,
    testimonials as testimonialsApi, pricing as pricingApi, auth } from '../api';

const DataContext = createContext(null);

export function DataProvider({ children }) {
    const [services, setServicesState] = useState([]);
    const [projects, setProjectsState] = useState([]);
    const [team, setTeamState] = useState([]);
    const [testimonials, setTestimonialsState] = useState([]);
    const [pricing, setPricingState] = useState([]);
    const [currentUser, setCurrentUserState] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Load content from the Django backend on mount. Each list falls back
    // to [] if that particular request fails, so one bad endpoint doesn't
    // blank out the rest of the site.
    useEffect(() => {
        let cancelled = false;

        async function loadAll() {
            const results = await Promise.allSettled([
                servicesApi.list(),
                projectsApi.list(),
                teamApi.list(),
                testimonialsApi.list(),
                pricingApi.list(),
            ]);

            if (cancelled) return;

            const [svc, proj, tm, test, price] = results;
            setServicesState(svc.status === 'fulfilled' ? svc.value : []);
            setProjectsState(proj.status === 'fulfilled' ? proj.value : []);
            setTeamState(tm.status === 'fulfilled' ? tm.value : []);
            setTestimonialsState(test.status === 'fulfilled' ? test.value : []);
            setPricingState(price.status === 'fulfilled' ? price.value : []);

            const firstFailure = results.find(r => r.status === 'rejected');
            if (firstFailure) {
                setError(firstFailure.reason?.message || 'Failed to reach the backend.');
            }

            // Restore session if a token is already stored
            if (auth.isAuthenticated()) {
                try {
                    const me = await auth.me();
                    if (!cancelled) setCurrentUserState(me);
                } catch {
                    // stale/invalid token — ignore, user stays logged out
                }
            }

            setLoading(false);
        }

        loadAll();
        return () => { cancelled = true; };
    }, []);

    const value = {
        services,
        setServices: setServicesState, // local-only; use servicesApi for persistence
        projects,
        setProjects: setProjectsState,
        team,
        setTeam: setTeamState,
        testimonials,
        setTestimonials: setTestimonialsState,
        pricing,
        setPricing: setPricingState,
        currentUser,
        setCurrentUser: setCurrentUserState,
        loading,
        error,
    };

    return (
        <DataContext.Provider value={value}>
            {children}
        </DataContext.Provider>
    );
}

export function useData() {
    return useContext(DataContext);
}
