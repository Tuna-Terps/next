import loginStyles from '../styles/Login.module.css'

export default function Form() {
    return (
    <div className={loginStyles.loginbox}>
        <img src="avatar.jpg" className={loginStyles.avatar}/>
        <h4>Login Here</h4>
        <form>
            <p>Username</p>
            <form action="/api/form" method="post">
                <input type="text" id="username" placeholder="Enter Username" required/>
            </form>
            <p>Password</p>
            <form>
                <input type="password" id="auth" placeholder="Enter Password" required />
            </form>
            <li><a href="/recovery">Forgot your password?</a></li>
            <li><a href="/signup">Don't have an account? Sign up here</a></li>
        </form>
    </div>
    )
}

export default FormLogin;
