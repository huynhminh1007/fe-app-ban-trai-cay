import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { getPostById } from "../fakeApi/postApi";
import "../styles/postDetail.scss";

const PostDetail = () => {
    const { id } = useParams();
    const [post, setPost] = useState(null);

    useEffect(() => {
        async function loadPost() {
            const res = await getPostById(id);
            setPost(res);
        }
        loadPost();
    }, [id]);

    if (!post) return <p style={{ padding: 40 }}>Đang tải bài viết...</p>;

    return (
        <div className="post-detail">
            <Header />

            <div className="container">
                <h1 className="post-title">{post.title}</h1>

                <div className="post-meta">
          <span>
            📅 {new Date(post.date).toLocaleDateString("vi-VN")}
          </span>
                </div>

                <div
                    className="post-content"
                    dangerouslySetInnerHTML={{ __html: post.content }}
                />
            </div>

            <Footer />
        </div>
    );
};

export default PostDetail;
