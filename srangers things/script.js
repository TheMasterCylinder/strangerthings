
const BASE_URL = "https://strangers-things.herokuapp.com"

const fetchPosts = async () => {
    try {
        const response = await fetch(`${BASE_URL}/api/2102-CPU-RM-WEB-PT/posts`)
        const data = await response.json()
        return data.data.posts
    } catch(error) {
        console.error(error)
    }
}

const fetchMe = async () => {
    try {
        const response = await fetch(`${BASE_URL}/api/2102-CPU-RM-WEB-PT/users/me`, {
            headers: {
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDdiNDI5NjVkMmNmMzAwMTc0ZWQ1NjkiLCJ1c2VybmFtZSI6InN1cGVybWFuMjciLCJpYXQiOjE2MTg4ODQwNDJ9.c0-iHm9KH1v5apNTzFn0gsm3pOgzyDjRf9pMefTF24c'
            }
        })
        const data = await response.json()
        return data.data
    } catch(error) {
        console.error(error)
    }
}
const renderPosts = (posts, me) => {
    posts.forEach((post) => {
        const postElement = createPostHTML(post, me) 
        $("#posts").append(postElement)
    })
}
const createPostHTML = (post, me) => {
    return `
    <div class="card" style="width: 18rem;">
        <div class="card-body">
            <h5 class="card-title">${post.title}</h5>
            <p class="card-text">${post.description}</p>
            <a href="#" class="btn btn-primary">Go somewhere</a>
            ${ me._id === post.author._id ?
            `<svg class="svg-icon" viewBox="0 0 20 20">
                <path d="M18.303,4.742l-1.454-1.455c-0.171-0.171-0.475-0.171-0.646,0l-3.061,3.064H2.019c-0.251,0-0.457,0.205-0.457,0.456v9.578c0,0.251,0.206,0.456,0.457,0.456h13.683c0.252,0,0.457-0.205,0.457-0.456V7.533l2.144-2.146C18.481,5.208,18.483,4.917,18.303,4.742 M15.258,15.929H2.476V7.263h9.754L9.695,9.792c-0.057,0.057-0.101,0.13-0.119,0.212L9.18,11.36h-3.98c-0.251,0-0.457,0.205-0.457,0.456c0,0.253,0.205,0.456,0.457,0.456h4.336c0.023,0,0.899,0.02,1.498-0.127c0.312-0.077,0.55-0.137,0.55-0.137c0.08-0.018,0.155-0.059,0.212-0.118l3.463-3.443V15.929z M11.241,11.156l-1.078,0.267l0.267-1.076l6.097-6.091l0.808,0.808L11.241,11.156z"></path>
            </svg>`: ''} 
        </div>
    </div>
    `
}
(async () => {
    const posts = await fetchPosts();
    const me = await fetchMe();
    renderPosts(posts, me)
})()


const registerUser = async (usernameValue, passwordValue) => {
    const url = `${BASE_URL}/auth/register`;
    try {
        const response = await fetch(url, { 
            method: "POST",
            body: JSON.stringify({ 
                username: usernameValue,
                password: passwordValue
            }),
            headers: {
                "Content-Type": "application/json"
            }
        });
        const { data: {token} } = await response.json();
        localStorage.setItem("token", JSON.stringify(token))
    } catch(error) {
        console.error(error);
    }
}




