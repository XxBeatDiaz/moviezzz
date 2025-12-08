export async function fetchAction(API_URL, method = 'GET', body) {
    const options = {
        method,
        headers: { 'Content-Type': 'application/json' },
        ...(method !== 'GET' && { body: JSON.stringify(body) })
    };

    const res = await fetch(API_URL, options);
    
    if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
    }

    return res.json();
}
