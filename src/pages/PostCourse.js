import { useState } from 'react';
import { Container, Button, Form } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { postCourseService } from '~/services/courseService';
import { userInfoSelector } from '~/store/selectors';
import { fileToBase64 } from '~/utils/commonUtils';

const PostCourse = () => {
    const userInfo = useSelector(userInfoSelector);
    const [validated, setValidated] = useState(false);

    const [img, setImg] = useState(null);
    const [courseInfo, setCourseInfo] = useState({
        authorId: userInfo?.id,
        level: 1,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCourseInfo({
            ...courseInfo,
            [name]: value,
        });
    };

    const handleChangeFile = async (e) => {
        let base64 = await fileToBase64(e.target.files[0]);
        setImg(base64);
        setCourseInfo({
            ...courseInfo,
            img: base64,
        });
    };

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        } else {
            postCourseService(courseInfo);
        }

        setValidated(true);
    };

    return (
        <Container className="mt-3">
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
                    {img && <img width={300} className="mt-4 mb-3" style={{ maxHeight: '300px' }} src={img} alt="" />}
                </Form.Group>
                <Button variant="primary" type="submit" className="mb-3">
                    Submit
                </Button>
            </Form>
        </Container>
    );
};

export default PostCourse;
