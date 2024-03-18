import Header from '~/containers/Header';

const LayoutOnlyHeader = ({ children }) => {
    return (
        <div>
            <Header />
            <div>{children}</div>
        </div>
    );
};

export default LayoutOnlyHeader;
