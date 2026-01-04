import EmojiPicker from 'emoji-picker-react';

const Emojis = ({ onSelect }) => {
    // hàm này sẽ chuyền emoji đã chọn lên component cha thông qua onSelect
    const handleEmojiClick = (emojiObject) => {
        onSelect(emojiObject); 
    };

    return (
        <div className="emoji-picker-wrapper">
            <EmojiPicker 
                onEmojiClick={handleEmojiClick}
                width={300}
                height={350}
                previewConfig={{ showPreview: false }} 
            />
        </div>
    );
};

export default Emojis;