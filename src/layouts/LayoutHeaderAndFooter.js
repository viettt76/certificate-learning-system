import Footer from '~/containers/Footer';
import Header from '~/containers/Header';

const LayoutHeaderAndFooter = ({ children }) => {
    return (
        <div>
            <Header />
            <div>{children}</div>
            <Footer />
        </div>
    );
};

export default LayoutHeaderAndFooter;
