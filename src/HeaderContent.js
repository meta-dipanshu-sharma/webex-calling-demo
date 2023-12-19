import logo from './logo.svg';

function HeaderContent() {
    return (
        <header class="site-header sticky-top py-1">
            <nav class="container d-flex flex-column flex-md-row justify-content-between" style={{ color: "white" }}>
                <a class="py-2" href="#" aria-label="Product">
                    <img src={logo} alt='logo'></img>
                </a>
                <h3>Calling DEMO - Telehealth Use Case</h3>
            </nav>
        </header>
    );
}

export default HeaderContent;
