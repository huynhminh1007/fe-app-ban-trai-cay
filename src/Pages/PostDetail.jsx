import "../styles/postDetail.scss";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { getPostById } from "../fakeApi/postApi";




const PostDetail = () => {
    const { id } = useParams();
    const [post, setPost] = useState(null);


    useEffect(() => {
        getPostById(id).then(setPost);
    }, [id]);


    if (!post) return null;


    return (
        <div className="post-detail-page">
            <Header />


            <div className="post-container">
                {/* SIDEBAR */}
                <aside className="post-sidebar">
                    <h3 className="sidebar-title">CHUYÊN MỤC</h3>
                    <ul>
                        <li>Cây giống hợp đồng</li>
                        <li>Cây giống sỉ</li>
                        <li>Giá nông sản</li>
                        <li>Góc tư vấn cây ăn quả</li>
                        <li>Kỹ thuật trồng</li>
                        <li>Tin tức</li>
                    </ul>
                </aside>


                {/* CONTENT */}
                <main className="post-content">
                    <h1 className="post-title">{post.title}</h1>


                    <div className="post-meta">
           <span>
             {new Date(post.date).toLocaleDateString("vi-VN")}
           </span>
                    </div>


                    {/* TOC BOX */}
                    <div className="toc-box">
                        <strong>Nội dung bài viết</strong>
                        <ol>
                            <li>{post.title}</li>
                            <li>Phát triển doanh nghiệp phải bắt đầu từ vùng trồng</li>
                            <li>Giữ chữ tín để tạo liên kết dài hạn</li>
                        </ol>
                    </div>


                    {/* HTML CONTENT */}
                    <div
                        className="post-body"
                        dangerouslySetInnerHTML={{ __html: post.content }}
                    />
                </main>
            </div>


            <Footer />
        </div>
    );
};


export default PostDetail;

