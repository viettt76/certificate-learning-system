import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { Container, Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { postCourseService, getPersonalInfoService } from '~/services';
import { fileToBase64 } from '~/utils/commonUtils';
import styles from './PostCourse.module.scss';

const PostCourse = () => {
    const navigate = useNavigate();
    const [userInfo, setUserInfo] = useState(null);
    const [img, setImg] = useState(null);
    const [courseInfo, setCourseInfo] = useState(null);

    const [validated, setValidated] = useState(false);

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const res = await getPersonalInfoService();
                if (!res?.errCode) {
                    setUserInfo(res?.data);
                } else {
                    setUserInfo(null);
                }
            } catch (error) {
                console.log(error);
                setUserInfo(null);
            }
        };

        fetchUserInfo();
    }, []);

    useEffect(() => {
        setCourseInfo({
            authorId: userInfo?.id,
            level: 1,
        });
    }, [userInfo]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCourseInfo({
            ...courseInfo,
            [name]: value,
        });
    };

    const handleChangeFile = async (e) => {
        try {
            const base64 = await fileToBase64(e.target.files[0]);
            setImg(base64);
            setCourseInfo({
                ...courseInfo,
                img: base64,
            });
        } catch (error) {
            console.log(error);
        }
    };

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        } else {
            event.preventDefault();
            postCourseService(courseInfo);
            navigate('/instructor/courses');
        }

        setValidated(true);
    };

    return (
        <Container className={clsx('mt-3', styles['wrapper'])}>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Tên khoá học</Form.Label>
                    <Form.Control required name="name" type="text" onChange={handleChange} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Miêu tả khoá học</Form.Label>
                    <Form.Control required name="description" as="textarea" rows={3} onChange={handleChange} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Giá</Form.Label>
                    <Form.Control required name="price" type="text" onChange={handleChange} />
                </Form.Group>
                <Form.Select name="level" className="mb-3" onChange={handleChange}>
                    <option value="1">Cơ bản</option>
                    <option value="2">Nâng cao</option>
                </Form.Select>
                <Form.Group className="mb-3">
                    <Form.Label>Ảnh</Form.Label>
                    <Form.Control required name="img" type="file" onChange={handleChangeFile} />
                    {img && <img width={300} className="mt-4 mb-3" style={{ maxHeight: '30rem' }} src={img} alt="" />}
                </Form.Group>
                <Button variant="primary" type="submit" className={clsx('mb-3', styles['btn-submit'])}>
                    Submit
                </Button>
            </Form>
        </Container>
    );
};

export default PostCourse;
