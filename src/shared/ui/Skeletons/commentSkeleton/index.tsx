import styles from "./styles.module.scss";

export const CommentSkeleton = () => {
    return (
        <div className={styles.container}>
            <div className={styles.comment_userAvatar}></div>

            <div className={styles.comment_info}>
                <div className={styles.comment_userName}></div>
                <div className={styles.comment_userComment}></div>
                <div className={styles.comment_userComment}></div>
                <div className={styles.comment_userStats}></div>
            </div>
        </div>
    )
}