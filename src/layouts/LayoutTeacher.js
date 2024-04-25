import TeacherHeader from '~/containers/TeacherHeader';

const LayoutTeacher = ({ children }) => {
    return (
        <div>
            <TeacherHeader />
            <div>{children}</div>
        </div>
    );
};

export default LayoutTeacher;
