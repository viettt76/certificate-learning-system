import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import clsx from 'clsx';
import { getCourseDetailsService } from '~/services';
import { convertBufferToBase64, formatPrice } from '~/utils/commonUtils';
import styles from './PurchaseCourse.module.scss';
import { Container, Modal } from 'react-bootstrap';

const PurchaseCourse = () => {
    const { courseId } = useParams();
    const [courseDetails, setCourseDetails] = useState(null);

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        const fetchCourseDetails = async () => {
            try {
                const res = await getCourseDetailsService(courseId);
                if (!res?.errCode) {
                    const course = res?.data;
                    setCourseDetails({
                        name: course?.name,
                        price: course?.price,
                        img: course?.img,
                    });
                }
            } catch (error) {
                console.log(error);
            }
        };
        fetchCourseDetails();
    }, [courseId]);

    return (
        <Container className="mt-5 d-flex flex-column align-items-center">
            <div className={clsx(styles['wrapper'])}>
                <div className="d-flex align-items-center">
                    <img
                        className={clsx('me-3', styles['course-img'])}
                        src={convertBufferToBase64(courseDetails?.img)}
                        alt={courseDetails?.name}
                    />
                    <div>
                        <div className={clsx(styles['course-name'])}>{courseDetails?.name}</div>
                        <div className={clsx(styles['course-price'])}>{formatPrice(courseDetails?.price, 'VND')}</div>
                    </div>
                </div>
                <div className={clsx('d-flex justify-content-between mt-5', styles['total-payment'])}>
                    <div>Tổng:</div> <div>{formatPrice(courseDetails?.price, 'VND')}</div>
                </div>
                <button className={clsx('btn btn-info text-white', styles['btn-payment'])} onClick={handleShow}>
                    Thanh toán
                </button>
            </div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Body className="p-0">
                    <img src="https://img.vietqr.io/image/VPB-0339552928-compact.png" alt="" />
                </Modal.Body>
            </Modal>
        </Container>
    );
};

export default PurchaseCourse;
