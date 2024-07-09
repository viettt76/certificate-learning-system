import Slider from 'react-slick';
import clsx from 'clsx';
import Course from '~/components/Course';
import styles from './GroupCourses.module.scss';

const GroupCourses = ({ title, groupCourses, isTeacher }) => {
    const slidesToShow = 5;
    const settings = {
        dots: true,
        adaptiveHeight: true,
        lazyLoad: 'ondemand',
        infinite: false,
        speed: 500,
        slidesToShow: slidesToShow,
        slidesToScroll: 5,
        responsive: [
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 2,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                },
            },
        ],
    };

    return (
        <div
            className={clsx(
                groupCourses?.length <= slidesToShow ? 'slick-track-number-of-slide-less-slides-to-show' : '',
                styles['wrapper'],
            )}
        >
            <h3 className={clsx(styles['title'])}>{title}</h3>
            <Slider {...settings}>
                {groupCourses.map((course, index) => {
                    return (
                        <div style={{ width: 100 }} key={`course-${index}`}>
                            <Course
                                courseId={course?.id}
                                img={course?.img}
                                name={course?.name}
                                authorId={course?.authorId}
                                imgAuthor={course?.imgAuthor}
                                nameAuthor={course?.nameAuthor}
                                time={course?.time}
                                price={course?.price}
                                isTeacher={isTeacher}
                            />
                        </div>
                    );
                })}
            </Slider>
        </div>
    );
};

export default GroupCourses;
