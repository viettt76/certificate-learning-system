import clsx from 'clsx';
import Slide from '~/components/Slide';
import styles from './Home.module.scss';
import GroupCourses from '~/components/GroupCourses';

const GroupCourseFree = [
    {
        name: 'Marketing',
        img: 'https://th.bing.com/th/id/OIP.JWsuS6dzIXoA4wqfBSWyywHaEK?rs=1&pid=ImgDetMain',
        genres: 'Finances',
        imgAuthor: 'https://thuthuatnhanh.com/wp-content/uploads/2020/09/hinh-anh-anime-lanh-lung-xam-chat.jpg',
        nameAuthor: 'Hoàng Quốc Việt',
        time: '8 giờ 18 phút',
        fee: 'Miễn phí',
    },
    {
        name: 'Digital Marketing',
        img: 'https://th.bing.com/th/id/OIP.MdOfxiQLOKSYowdtAqT19gHaFj?w=1024&h=768&rs=1&pid=ImgDetMain',
        genres: 'Marketing',
        imgAuthor: 'https://khoinguonsangtao.vn/wp-content/uploads/2022/08/anh-anime-nam-dep-hiem-cute.jpg',
        nameAuthor: 'Nguyễn Văn Anh Vũ',
        time: '15 giờ 56 phút',
        fee: 'Miễn phí',
    },
    // {
    //     name: 'A',
    //     img: 'https://th.bing.com/th/id/R.b7b421f3bd18d4c966ff4c15c72fa319?rik=QvBhLIkgH8%2bqHg&pid=ImgRaw&r=0',
    //     genres: 'Finances',
    //     imgAuthor: 'https://thuthuatnhanh.com/wp-content/uploads/2020/09/hinh-anh-anime-lanh-lung-xam-chat.jpg',
    //     nameAuthor: 'Hoàng Quốc Việt',
    //     time: '8 giờ 18 phút',
    //     fee: 'Miễn phí',
    // },
    // {
    //     name: 'B',
    //     img: 'https://th.bing.com/th/id/OIP.MdOfxiQLOKSYowdtAqT19gHaFj?w=1024&h=768&rs=1&pid=ImgDetMain',
    //     genres: 'Marketing',
    //     imgAuthor: 'https://th.bing.com/th/id/OIP.Yi7vYXE4n2pQd_JpRI92fwHaIe?w=450&h=515&rs=1&pid=ImgDetMain',
    //     nameAuthor: 'Nguyễn Văn Anh Vũ',
    //     time: '15 giờ 56 phút',
    //     fee: 'Miễn phí',
    // },
    // {
    //     name: 'C',
    //     img: 'https://i.pinimg.com/originals/a2/5a/89/a25a89c12e0fd087eae85fb348ca553c.jpg',
    //     genres: 'Marketing',
    //     imgAuthor: 'https://thuthuatnhanh.com/wp-content/uploads/2020/09/hinh-anh-anime-lanh-lung-xam-chat.jpg',
    //     nameAuthor: 'Hoàng Quốc Việt',
    //     time: '8 giờ 18 phút',
    //     fee: 'Miễn phí',
    // },
    // {
    //     name: 'D',
    //     img: 'https://th.bing.com/th/id/R.d43610afdd15f3b391e28386c17e33a3?rik=YfTkC%2f7fTbplzw&pid=ImgRaw&r=0',
    //     genres: 'Marketing',
    //     imgAuthor: 'https://khoinguonsangtao.vn/wp-content/uploads/2022/08/anh-anime-nam-dep-hiem-cute.jpg',
    //     nameAuthor: 'Nguyễn Văn Anh Vũ',
    //     time: '15 giờ 56 phút',
    //     fee: 'Miễn phí',
    // },
    // {
    //     name: 'E',
    //     img: 'https://th.bing.com/th/id/OIP.JWsuS6dzIXoA4wqfBSWyywHaEK?rs=1&pid=ImgDetMain',
    //     genres: 'Finances',
    //     imgAuthor: 'https://thuthuatnhanh.com/wp-content/uploads/2020/09/hinh-anh-anime-lanh-lung-xam-chat.jpg',
    //     nameAuthor: 'Hoàng Quốc Việt',
    //     time: '8 giờ 18 phút',
    //     fee: 'Miễn phí',
    // },
    // {
    //     name: 'F',
    //     img: 'https://th.bing.com/th/id/OIP.MdOfxiQLOKSYowdtAqT19gHaFj?w=1024&h=768&rs=1&pid=ImgDetMain',
    //     genres: 'Marketing',
    //     imgAuthor: 'https://khoinguonsangtao.vn/wp-content/uploads/2022/08/anh-anime-nam-dep-hiem-cute.jpg',
    //     nameAuthor: 'Nguyễn Văn Anh Vũ',
    //     time: '15 giờ 56 phút',
    //     fee: 'Miễn phí',
    // },
    // {
    //     name: 'G',
    //     img: 'https://img.thuthuatphanmem.vn/uploads/2018/10/02/anh-anime-3d-dep_103500928.jpg',
    //     genres: 'Finances',
    //     imgAuthor: 'https://thuthuatnhanh.com/wp-content/uploads/2020/09/hinh-anh-anime-lanh-lung-xam-chat.jpg',
    //     nameAuthor: 'Hoàng Quốc Việt',
    //     time: '8 giờ 18 phút',
    //     fee: 'Miễn phí',
    // },
];

const Home = () => {
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

export default Home;
