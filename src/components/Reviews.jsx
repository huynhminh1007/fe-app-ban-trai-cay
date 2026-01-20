import { useCallback, useEffect, useMemo, useState } from "react";
import axiosClient from "../api/axiosClient";

const filters = [
  { key: "all", label: "Tất Cả" },
  { key: 5, label: "5 Sao" },
  { key: 4, label: "4 Sao" },
  { key: 3, label: "3 Sao" },
  { key: 2, label: "2 Sao" },
  { key: 1, label: "1 Sao" },
  { key: "comment", label: "Có Bình Luận" },
  { key: "image", label: "Có Hình Ảnh / Video" },
];

function MediaItem({ url, onClick }) {
  const isVideo = /\.(mp4|webm|ogg)$/i.test(url);

  return (
    <div
      className="relative w-24 h-24 border rounded overflow-hidden cursor-pointer"
      onClick={() => onClick(url, isVideo)}
    >
      {isVideo ? (
        <>
          <video
            src={url}
            className="w-full h-full object-cover"
            muted
            preload="metadata"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black/30">
            <span className="text-white text-3xl">▶</span>
          </div>
        </>
      ) : (
        <img src={url} className="w-full h-full object-cover" alt="" />
      )}
    </div>
  );
}

export default function Reviews({ productId }) {
  const productIdNum = Number(productId);

  const [activeFilter, setActiveFilter] = useState("all");
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);

  const [reviews, setReviews] = useState([]);
  const [summary, setSummary] = useState(null);
  const [totalPages, setTotalPages] = useState(0);

  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [content, setContent] = useState("");
  const [files, setFiles] = useState([]);
  const [submitting, setSubmitting] = useState(false);

  const [preview, setPreview] = useState(null);

  const params = useMemo(() => {
    const p = { page, size: 5 };

    if (activeFilter === "comment") p.hasComment = true;
    else if (activeFilter === "image") p.hasImage = true;
    else if (typeof activeFilter === "number") p.rating = activeFilter;

    return p;
  }, [page, activeFilter]);

  const fetchReviews = useCallback(async () => {
    if (!productIdNum) return;

    try {
      setLoading(true);
      const res = await axiosClient.get(`/reviews/${productIdNum}`, { params });

      setSummary(res.data.summary);
      setReviews(res.data.reviews.content);

      setTotalPages(res.data.reviews.totalPages);
    } catch (err) {
      console.error("Load reviews failed", err);
      setReviews([]);
      setSummary(null);
      setTotalPages(0);
    } finally {
      setLoading(false);
    }
  }, [productIdNum, params]);

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  const handleFileChange = (e) => {
    setFiles(Array.from(e.target.files));
  };

  const handleSubmitReview = async () => {
    if (!rating) {
      alert("Vui lòng chọn số sao");
      return;
    }

    try {
      setSubmitting(true);

      const formData = new FormData();
      formData.append("userId", 1);
      formData.append("rating", rating);
      if (content) formData.append("content", content);
      files.forEach((f) => formData.append("files", f));

      const res = await axiosClient.post(`/reviews/${productIdNum}`, formData);

      if (res.status !== 200) throw new Error("Submit failed");

      setRating(0);
      setHoverRating(0);
      setContent("");
      setFiles([]);

      fetchReviews();
    } catch (err) {
      console.error("Create review failed", err);
      alert("Gửi đánh giá thành công");
      fetchReviews();
    } finally {
      setSubmitting(false);
    }
  };

  const averageRating = summary?.averageRating ?? 0;

  const filterCounts = useMemo(() => {
    if (!summary) return {};
    return {
      all: summary.totalReviews,
      comment: summary.commentCount,
      image: summary.imageCount,
      1: summary.ratingCounts?.[1] ?? 0,
      2: summary.ratingCounts?.[2] ?? 0,
      3: summary.ratingCounts?.[3] ?? 0,
      4: summary.ratingCounts?.[4] ?? 0,
      5: summary.ratingCounts?.[5] ?? 0,
    };
  }, [summary]);

  return (
    <div className="similar-wrapper">
      <h2 className="section-title mb-4">ĐÁNH GIÁ SẢN PHẨM</h2>

      <div className="con-1 flex gap-6 items-start mb-6">
        <div className="min-w-[140px]">
          <div className="text-rating text-3xl font-semibold">
            {averageRating.toFixed(1)}
            <span className="text-base text-gray-600"> trên 5</span>
          </div>

          <div className="flex text-[#F2D21E] mt-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <span key={i}>{i < Math.round(averageRating) ? "★" : "☆"}</span>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {filters.map((f) => (
            <button
              key={f.key}
              onClick={() => {
                setActiveFilter(f.key);
                setPage(0);
              }}
              className={`px-3 py-1 border rounded text-sm
                ${
                  activeFilter === f.key
                    ? "border-[#FF4500] text-[#FF4500]"
                    : "border-gray-300 text-gray-600"
                }`}
            >
              {f.label}
              {filterCounts[f.key] !== undefined && (
                <span className="ml-1">({filterCounts[f.key]})</span>
              )}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <p className="text-gray-500">Đang tải đánh giá...</p>
      ) : (
        <div className="space-y-6">
          {reviews.map((r) => (
            <div
              key={r.id}
              className="flex gap-4 border-b border-[#e1e1e1] pb-[20px]"
            >
              <img
                src={r.userAvatar}
                alt=""
                className="w-10 h-10 rounded-full"
              />

              <div className="flex-1">
                <p className="font-medium">{r.userName}</p>

                <div className="text-[#F2D21E] text-sm">
                  {"★★★★★".slice(0, r.rating)}
                </div>

                <p className="text-xs text-gray-400">
                  {new Date(r.date).toLocaleString()}
                </p>

                {r.content && (
                  <p className="mt-2 text-sm text-gray-700">{r.content}</p>
                )}

                {r.images?.length > 0 && (
                  <div className="flex gap-2 mt-3 flex-wrap">
                    {r.images.map((url, i) => (
                      <MediaItem
                        key={i}
                        url={url}
                        onClick={(u, isVideo) =>
                          setPreview({ url: u, isVideo })
                        }
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-6">
          <button
            disabled={page === 0}
            onClick={() => setPage((p) => p - 1)}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Trước
          </button>

          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => setPage(i)}
              className={`px-3 py-1 border rounded
                ${page === i ? "bg-[#FF4500] text-white" : ""}`}
            >
              {i + 1}
            </button>
          ))}

          <button
            disabled={page === totalPages - 1}
            onClick={() => setPage((p) => p + 1)}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Sau
          </button>
        </div>
      )}

      <div className="mt-10 border-t pt-6">
        <h3 className="font-semibold mb-4">Viết đánh giá của bạn</h3>

        {/* STAR */}
        <div className="flex gap-1 mb-4">
          {Array.from({ length: 5 }).map((_, i) => {
            const star = i + 1;
            return (
              <span
                key={star}
                className="text-2xl cursor-pointer"
                style={{
                  color: star <= (hoverRating || rating) ? "#F2D21E" : "#ccc",
                }}
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
                onClick={() => setRating(star)}
              >
                ★
              </span>
            );
          })}
        </div>

        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={4}
          className="w-full border rounded p-3 text-sm"
          placeholder="Chia sẻ cảm nhận của bạn..."
        />

        <div className="mt-3">
          <label
            htmlFor="upload-file"
            className="inline-flex items-center gap-2 px-4 py-2
               border border-dashed border-gray-400
               rounded-md cursor-pointer
               text-gray-600 hover:border-green-600 hover:text-green-600
               transition"
          >
            📤 Tải lên hình ảnh / video của bạn
          </label>

          <input
            id="upload-file"
            type="file"
            multiple
            accept="image/*,video/*"
            onChange={handleFileChange}
            className="hidden"
          />
        </div>

        {files.length > 0 && (
          <div className="flex gap-2 mt-3 flex-wrap">
            {files.map((f, i) => {
              const url = URL.createObjectURL(f);
              return f.type.startsWith("video") ? (
                <video
                  key={i}
                  src={url}
                  className="w-24 h-24 object-cover border rounded"
                />
              ) : (
                <img
                  key={i}
                  src={url}
                  className="w-24 h-24 object-cover border rounded"
                  alt=""
                />
              );
            })}
          </div>
        )}

        <button
          onClick={handleSubmitReview}
          disabled={submitting}
          className="mt-4 px-6 py-2 bg-[#FF4500] text-white rounded disabled:opacity-60"
        >
          {submitting ? "Đang gửi..." : "Gửi đánh giá"}
        </button>
      </div>

      {preview && (
        <div
          className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center"
          onClick={() => setPreview(null)}
        >
          <div onClick={(e) => e.stopPropagation()}>
            {preview.isVideo ? (
              <video
                src={preview.url}
                controls
                autoPlay
                className="max-h-[90vh] rounded"
              />
            ) : (
              <img src={preview.url} className="max-h-[90vh] rounded" alt="" />
            )}
          </div>
        </div>
      )}
    </div>
  );
}
