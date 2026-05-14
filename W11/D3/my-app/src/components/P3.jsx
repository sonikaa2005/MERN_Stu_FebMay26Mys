// Axios usage with useEffect

import { useEffect, useState } from "react";
import api from "../services/api";

export function AxiosLifecycle() {

    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);

    // To store error message
    const [error, setError] = useState("");

    useEffect(() => {

        const controller = new AbortController();

        loadPosts(controller.signal);

        return () => {
            controller.abort();
        };

    }, []);

    async function loadPosts(signal) {

        setLoading(true);
        setError("");

        try {

            const response = await api.get(
                "/posts",
                { signal }
            );

            setPosts(response.data.slice(0, 5));

        } catch (error) {

            if (
                error.name === "CanceledError" ||
                error.code === "ERR_CANCELED"
            ) {
                return;
            }

            console.error(error);
            setError(error.message || "Failed to fetch users");

        } finally {

            setLoading(false);

        }
    }

    function handleReload() {

        const controller = new AbortController();
        loadPosts(controller.signal);

    }

    return (
        <section>

            <h2>Axios Lifecycle</h2>

            <button onClick={handleReload} disabled={loading}>
                {loading ? "Loading..." : "Reload Users"}
            </button>

            {/* Loading UI */}
            {loading && <p>Loading Users...</p>}

            {/* Error UI */}
            {!loading && error && (
                <p>Error: {error}</p>
            )}

            {/* Empty State UI */}
            {!loading && !error && posts.length === 0 && (
                <p>No users found.</p>
            )}

            {/* Success UI */}
            {!loading && !error && posts.length > 0 &&
                posts.map((post) => (
                    <article key={post.id}>
                        <h4>{post.title}</h4>
                        <p>{post.body}</p>
                    </article>
                ))
            }

        </section>
    );
}