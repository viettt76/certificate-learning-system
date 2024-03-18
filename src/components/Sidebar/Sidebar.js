import { faGraduationCap, faHouse } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import clsx from 'clsx';
import { NavLink } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
import styles from './Sidebar.module.scss';

const Sidebar = () => {
    return (
        <Navbar className="d-flex align-items-start" bg="light" data-bs-theme="light">
            <Nav className={clsx('flex-column justify-content-start', 'me-auto', styles['wrapper'])}>
                <Nav.Link className={clsx(styles['item'])} as={NavLink} to="/">
                    <FontAwesomeIcon icon={faHouse} />
                    <span>Trang chủ</span>
                </Nav.Link>
                <Nav.Link className={clsx(styles['item'])} as={NavLink} to="/roadmap">
                    <FontAwesomeIcon icon={faGraduationCap} />
                    <span>Lộ trình</span>
                </Nav.Link>
            </Nav>
        </Navbar>
    );
};

export default Sidebar;
