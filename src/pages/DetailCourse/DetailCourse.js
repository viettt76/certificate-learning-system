import { useState } from 'react';
import { Button, Container } from 'react-bootstrap';
import _ from 'lodash';
import clsx from 'clsx';
import {
    faAngleDown,
    faAngleUp,
    faCirclePlay,
    faGaugeHigh,
    faGraduationCap,
    faStopwatch,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './DetailCourse.module.scss';
import { Link } from 'react-router-dom';

const DetailCourse = () => {
    const course = {
        name: 'Quản lý thời gian',
        img: 'https://th.bing.com/th/id/OIP.JWsuS6dzIXoA4wqfBSWyywHaEK?rs=1&pid=ImgDetMain',
        author: {
            img: 'https://th.bing.com/th/id/OIP.JWsuS6dzIXoA4wqfBSWyywHaEK?rs=1&pid=ImgDetMain',
            name: 'Hoàng Quốc Việt',
        },
        description:
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta nisi, tenetur laudantium voluptatum culpa maxime quis itaque alias quos, totam sit nesciunt aliquam porro id? Atque neque enim minima minus! Repellat aliquid quia dignissimos illum repudiandae, ab quas! Minima laudantium incidunt enim rerum perspiciatis consectetur saepe, quasi repellendus nobis quisquam!',
        level: 'Cơ bản',
        numberOfLessons: '12',
        time: '03 giờ 26 phút',
        curriculums: [
            {
                title: 'Giới thiệu về career paths trong lĩnh vực Cloud Computing & AWS',
                numberOfLessons: '3',
                panels: [
                    {
                        name: 'Các câu hỏi thường gặp',
                        time: '11:30',
                        link: 'https://youtu.be/8NWmfkQJ9Sg?list=RD8NWmfkQJ9Sg',
                    },
                    { name: 'Giáo viên', time: '01:46', link: 'https://youtu.be/8NWmfkQJ9Sg?list=RD8NWmfkQJ9Sg' },
                    { name: 'Giảng viên', time: '17:30', link: 'https://youtu.be/8NWmfkQJ9Sg?list=RD8NWmfkQJ9Sg' },
                ],
            },
            {
                title: 'Global infrastructure của AWS, giới thiệu các services chính.',
                numberOfLessons: '6',
                panels: [
                    { name: 'Học', time: '05:08', link: 'https://youtu.be/8NWmfkQJ9Sg?list=RD8NWmfkQJ9Sg' },
                    { name: 'nữa', time: '09:34', link: 'https://youtu.be/8NWmfkQJ9Sg?list=RD8NWmfkQJ9Sg' },
                    { name: 'Mãi', time: '23:56', link: 'https://youtu.be/8NWmfkQJ9Sg?list=RD8NWmfkQJ9Sg' },
                ],
            },
        ],
    };

    const [listActivePanel, setListActivePanel] = useState([]);

    const handleClickPanel = (index) => {
        if (listActivePanel.includes(index)) {
            let i = listActivePanel.indexOf(index);
            let copyListActivePanel = _.clone(listActivePanel);
            copyListActivePanel.splice(i, 1);
            setListActivePanel([...copyListActivePanel]);
        } else {
            setListActivePanel([...listActivePanel, index]);
        }
    };

    const handleExpandAll = () => {
        if (listActivePanel.length === course.curriculums.length) {
            setListActivePanel([]);
        } else {
            setListActivePanel([...Array(course.curriculums.length).keys()]);
        }
    };

    return (
        <Container className={clsx(styles['wrapper'])}>
            <div className={clsx(styles['overview'])}>
                <img className={clsx(styles['course-image'])} src={course.img} alt={course.name} />
                <div className={clsx(styles['course-info'])}>
                    <h3 className={clsx(styles['course-name'])}>{course.name}</h3>
                    <div className={clsx(styles['course-author'])}>
                        <img
                            className={clsx(styles['author-image'])}
                            src={course.author.img}
                            alt={course.author.name}
                        />
                        <span className={clsx(styles['author-name'])}>{course.author.name}</span>
                    </div>
                    <p className={clsx(styles['course-description'])}>{course.description}</p>
                </div>
                <div>
                    <Button className={clsx(styles['button-learn'])} size="lg">
                        Học miễn phí {'>'}
                    </Button>
                </div>
            </div>
            <div className={clsx(styles['special'])}>
                <div className={clsx(styles['special-item'])}>
                    <span className={clsx(styles['special-item-title'])}>
                        <FontAwesomeIcon icon={faGaugeHigh} />
                        <span>Trình độ</span>
                    </span>
                    <span>{course.level}</span>
                </div>
                <div className={clsx(styles['special-item'])}>
                    <span className={clsx(styles['special-item-title'])}>
                        <FontAwesomeIcon icon={faGraduationCap} />
                        <span>Số bài học</span>
                    </span>
                    <span>{course.numberOfLessons} bài học</span>
                </div>
                <div className={clsx(styles['special-item'])}>
                    <span className={clsx(styles['special-item-title'])}>
                        <FontAwesomeIcon icon={faStopwatch} />
                        <span>Thời lượng</span>
                    </span>
                    <span>{course.time}</span>
                </div>
            </div>
            <div className={clsx(styles['curriculum-of-course'])}>
                <h2 className={clsx(styles['curriculum-of-course-header'])}>Nội dung khoá học</h2>
                <div className={clsx(styles['curriculum-of-course-subheader'])}>
                    <ul>
                        <li>
                            <strong>{course.curriculums.length}</strong> chương
                        </li>
                        <li>•</li>
                        <li>
                            <strong>{course.numberOfLessons}</strong> bài học
                        </li>
                        <li>•</li>
                        <li>
                            Thời lượng <strong>{course.time}</strong>
                        </li>
                    </ul>
                    <div onClick={handleExpandAll} className={clsx(styles['curriculum-of-course-toggle-btn'])}>
                        {listActivePanel.length === course.curriculums.length ? 'Thu gọn tất cả' : 'Mở rộng tất cả'}
                    </div>
                </div>
                <ul className={clsx(styles['curriculum-of-course-curriculum-panel'])}>
                    {course.curriculums.map((curriculum, index) => {
                        return (
                            <li key={`panel-${index}`} className={clsx(styles['curriculum-of-course-panel'])}>
                                <div
                                    className={clsx(styles['curriculum-of-course-panel-title'])}
                                    onClick={() => handleClickPanel(index)}
                                >
                                    <div className={clsx(styles['curriculum-of-course-panel-title-float-left'])}>
                                        {listActivePanel.includes(index) ? (
                                            <FontAwesomeIcon icon={faAngleUp} />
                                        ) : (
                                            <FontAwesomeIcon icon={faAngleDown} />
                                        )}
                                        <h5>{curriculum.title}</h5>
                                    </div>
                                    <span className={clsx(styles['curriculum-of-course-panel-title-float-right'])}>
                                        {curriculum.numberOfLessons} bài học
                                    </span>
                                </div>
                                {listActivePanel.includes(index) ? (
                                    <div className={clsx(styles['curriculum-of-course-panel-collapse'])}>
                                        <ul>
                                            {curriculum.panels.map((panel, index) => {
                                                return (
                                                    <li key={`lesson-${index}`}>
                                                        <Link to="">
                                                            <FontAwesomeIcon icon={faCirclePlay} /> {panel.name}
                                                        </Link>
                                                        <div>{panel.time}</div>
                                                    </li>
                                                );
                                            })}
                                        </ul>
                                    </div>
                                ) : (
                                    <></>
                                )}
                            </li>
                        );
                    })}
                </ul>
            </div>
        </Container>
    );
};

export default DetailCourse;
