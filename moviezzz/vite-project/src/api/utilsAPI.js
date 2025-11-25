export async function fetchAction(API_URL, method = 'GET', body = null) {
    const response = await fetch(API_URL, {
        method: method,
        headers: {
            'Content-Type': 'application/json',
        },
        body: body ? JSON.stringify(body) : null,
    });

    return response.json();
}