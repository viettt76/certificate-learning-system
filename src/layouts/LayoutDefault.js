import Sidebar from '~/components/Sidebar';
import Header from '~/containers/Header';

const LayoutDefault = ({ children }) => {
    return (
        <div>
            <Header />
            <div style={{ display: 'flex' }}>
                <Sidebar />
                {children}
            </div>
        </div>
    );
};

export default LayoutDefault;
