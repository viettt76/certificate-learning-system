import clsx from 'clsx';
import Slide from '~/components/Slide';
import styles from './Roadmap.module.scss';
import GroupCourses from '~/components/GroupCourses';

const GroupCourseFree = [
    {
        name: 'Marketing',
        img: 'https://th.bing.com/th/id/OIP.JWsuS6dzIXoA4wqfBSWyywHaEK?rs=1&pid=ImgDetMain',
        imgAuthor: 'https://thuthuatnhanh.com/wp-content/uploads/2020/09/hinh-anh-anime-lanh-lung-xam-chat.jpg',
        nameAuthor: 'Hoàng Quốc Việt',
        time: '8 giờ 18 phút',
        price: 'Miễn phí',
    },
];

const Roadmap = () => {
    return (
        <div className={clsx(styles['wrapper'])}>
            <Slide />
            <GroupCourses
                className={clsx(styles['group-courses'])}
                title="Khoá học miễn phí"
                groupCourses={GroupCourseFree}
            />
        </div>
    );
};

export default Roadmap;
