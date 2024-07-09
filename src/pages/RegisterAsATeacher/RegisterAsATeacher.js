import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Container, Form } from 'react-bootstrap';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import { getPersonalInfoService, registerTeacherService } from '~/services';
import { customToast } from '~/utils/commonUtils';

const RegisterAsATeacher = () => {
    const navigate = useNavigate();
    const [userInfo, setUserInfo] = useState(null);
    const [teacherInfo, setTeacherInfo] = useState(null);

    const mdParser = new MarkdownIt();

    useEffect(() => {
        if (!!userInfo?.isTeacher) {
            navigate('/instructor/courses');
        }
    }, [userInfo, navigate]);

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const res = await getPersonalInfoService();
                if (!res?.errCode) {
                    setUserInfo(res?.data);
                    setTeacherInfo({ ...teacherInfo, id: res?.data?.id });
                } else {
                    setUserInfo(null);
                }
            } catch (error) {
                console.log(error);
                setUserInfo(null);
            }
        };
        fetchUserInfo();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleChangeForm = (e) => {
        const { name, value } = e.target;

        setTeacherInfo({
            ...teacherInfo,
            [name]: value,
        });
    };

    const handleEditorChange = ({ html }) => {
        setTeacherInfo({
            ...teacherInfo,
            introduction: html,
        });
    };

    const handleRegisterAsATeacher = async () => {
        try {
            const res = await registerTeacherService(teacherInfo);
            if (!res?.errCode) {
                customToast('success', 'Register as a teacher successfully!');
                navigate('/instructor/courses');
            } else {
                customToast('error', 'Register as a teacher failed!');
            }
        } catch (error) {
            console.log(error);
            customToast('error', error?.message || 'Register as a teacher failed!');
        }
    };

    return (
        <Container className="mt-5">
            <Form>
                <Form.Group className="mb-3">
                    <Form.Label>Nghề nghiệp hiện tại</Form.Label>
                    <Form.Control name="job" required onChange={handleChangeForm} />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Giới thiệu về bạn</Form.Label>
                    <MdEditor
                        style={{ height: '400px' }}
                        renderHTML={(text) => mdParser.render(text)}
                        onChange={handleEditorChange}
                    />
                </Form.Group>
                <Button
                    className="d-block mt-4 display-6 text-center"
                    style={{ fontSize: '1.6rem' }}
                    variant="primary"
                    onClick={handleRegisterAsATeacher}
                >
                    Đăng ký làm giáo viên
                </Button>
            </Form>
        </Container>
    );
};

export default RegisterAsATeacher;
