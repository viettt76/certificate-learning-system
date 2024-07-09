import clsx from 'clsx';
import { useRef, useState } from 'react';
import { Form, Button, Modal } from 'react-bootstrap';
import { postChapterService, postLessonService } from '~/services';
import { customToast } from '~/utils/commonUtils';
import styles from './ModalAddLesson.module.scss';

const ModalAddLesson = ({ courseId, nameCourse, chapterList, show, setShow }) => {
    const formRef = useRef(null);

    const handleClose = () => setShow(false);

    const [validated, setValidated] = useState(false);
    const [lessonInfo, setLessonInfo] = useState({});
    const [newChapter, setNewChapter] = useState(false);

    const handleChangeForm = (e) => {
        const { name, value } = e.target;

        setLessonInfo({
            ...lessonInfo,
            [name]: value,
        });
    };

    const handleSubmit = async (event) => {
        try {
            const form = formRef.current;
            if (form.checkValidity() === false) {
                event.preventDefault();
                event.stopPropagation();
            } else {
                if (newChapter) {
                    const chapterInfo = {
                        courseId,
                        chapterNumber: lessonInfo?.chapterNumber,
                        title: lessonInfo?.chapterTitle,
                    };
                    const res = await postChapterService(chapterInfo);
                    if (!res?.errCode) {
                        const chapterId = res?.data?.chapterId;
                        postLessonService({
                            chapterId,
                            lessonNumber: lessonInfo?.lessonNumber,
                            name: lessonInfo?.name,
                            video: lessonInfo?.video,
                        });
                    }
                    setShow(false);
                } else {
                    await postLessonService({
                        chapterId: lessonInfo?.chapterId,
                        lessonNumber: lessonInfo?.lessonNumber,
                        name: lessonInfo?.name,
                        video: lessonInfo?.video,
                    });
                    setShow(false);
                }
                customToast('success', 'Create successful lessons');
            }

            setValidated(true);
        } catch (error) {
            console.log(error);
            customToast('error', 'Create lessons from failure');
        }
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{nameCourse}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form ref={formRef} noValidate validated={validated} onSubmit={handleSubmit}>
                    {!newChapter ? (
                        <>
                            <Form.Label className="d-flex justify-content-between">
                                <span>Chọn chương</span>{' '}
                                <span onClick={() => setNewChapter(true)} className="text-primary">
                                    Chương mới
                                </span>
                            </Form.Label>
                            <Form.Control
                                required
                                as="select"
                                className="mb-3"
                                name="chapterId"
                                onChange={handleChangeForm}
                            >
                                <option value="">-- Chương --</option>
                                {chapterList?.map((chapter) => {
                                    return (
                                        <option value={chapter?.chapterId} key={`curriculum-${chapter?.chapterId}`}>
                                            {chapter?.chapterNumber}. {chapter?.title}
                                        </option>
                                    );
                                })}
                            </Form.Control>
                        </>
                    ) : (
                        <>
                            <Form.Group className="mb-3">
                                <Form.Label>Số chương</Form.Label>
                                <Form.Control required name="chapterNumber" onChange={handleChangeForm} />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Nhãn</Form.Label>
                                <Form.Control required name="chapterTitle" onChange={handleChangeForm} />
                            </Form.Group>
                            <button
                                className={clsx('btn btn-danger mb-3', styles['btn'])}
                                onClick={() => setNewChapter(false)}
                            >
                                Huỷ
                            </button>
                        </>
                    )}
                    <Form.Group className="mb-3">
                        <Form.Label>Số bài học</Form.Label>
                        <Form.Control required name="lessonNumber" onChange={handleChangeForm} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Tên bài học</Form.Label>
                        <Form.Control required name="name" onChange={handleChangeForm} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Video bài giảng</Form.Label>
                        <Form.Control required name="video" onChange={handleChangeForm} />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button className={clsx(styles['btn'])} variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button className={clsx(styles['btn'])} variant="primary" onClick={handleSubmit}>
                    Thêm bài giảng
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ModalAddLesson;
