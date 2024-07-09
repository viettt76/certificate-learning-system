import { useEffect, useRef, useState } from 'react';
import { Form, Button, Modal } from 'react-bootstrap';
import { updateCourseInfoService } from '~/services';
import { customToast, fileToBase64 } from '~/utils/commonUtils';

const ModalUpdateCourseDetails = ({ id, name, img, description, price, level, show, setShow }) => {
    const formRef = useRef(null);

    const [validated, setValidated] = useState(false);
    const [courseInfo, setCourseInfo] = useState({});
    const [imgPreview, setImgPreview] = useState(img);

    useEffect(() => {
        setImgPreview(img);
    }, [img]);

    useEffect(() => {
        setCourseInfo({
            id: id,
            name: name,
            img: img,
            description: description,
            price: price,
            level: level,
        });
    }, [id, name, img, description, price, level]);

    const handleClose = () => setShow(false);

    const handleChangeForm = (e) => {
        const { name, value } = e.target;

        setCourseInfo({
            ...courseInfo,
            [name]: value,
        });
    };

    const handleChangeFile = async (e) => {
        try {
            const base64 = await fileToBase64(e.target.files[0]);
            setImgPreview(base64);
            setCourseInfo({
                ...courseInfo,
                img: base64,
            });
        } catch (error) {
            console.log(error);
        }
    };

    const handleSubmit = async (event) => {
        try {
            const form = formRef.current;
            if (form.checkValidity() === false) {
                event.preventDefault();
                event.stopPropagation();
            } else {
                await updateCourseInfoService(courseInfo);
                setShow(false);
                customToast('success', 'Update course success!');
            }

            setValidated(true);
        } catch (error) {
            console.log(error);
            customToast('error', 'Update course failed!');
        }
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Sửa</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form ref={formRef} noValidate validated={validated} onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Tên khoá học</Form.Label>
                        <Form.Control required name="name" value={courseInfo?.name} onChange={handleChangeForm} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Ảnh</Form.Label>
                        <Form.Control name="img" type="file" onChange={handleChangeFile} />
                        <img width="100%" style={{ maxHeight: '40rem' }} src={imgPreview} alt="" />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Miêu tả</Form.Label>
                        <Form.Control
                            required
                            name="description"
                            value={courseInfo?.description}
                            onChange={handleChangeForm}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Giá</Form.Label>
                        <Form.Control required name="price" value={courseInfo?.price} onChange={handleChangeForm} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Mức độ</Form.Label>
                        <Form.Control
                            required
                            as="select"
                            name="level"
                            value={courseInfo?.level}
                            onChange={handleChangeForm}
                        >
                            <option value="">-- Mức độ --</option>
                            <option value="1">Cơ bản</option>
                            <option value="2">Nâng cao</option>
                        </Form.Control>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleSubmit}>
                    Sửa
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ModalUpdateCourseDetails;
