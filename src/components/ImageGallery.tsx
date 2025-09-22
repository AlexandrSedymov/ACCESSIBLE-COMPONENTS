import React, { useState } from 'react';

const images = [
    'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1519985176271-adb1088fa94c?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=400&h=300&fit=crop',
];

interface ImageGalleryProps {}

const ImageGallery: React.FC<ImageGalleryProps> = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);

    const openModal = (index: number) => {
        setCurrentIndex(index);
        setModalOpen(true);
    };

    const closeModal = () => setModalOpen(false);

    const showPrev = (e: React.MouseEvent) => {
        e.stopPropagation();
        setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    };

    const showNext = (e: React.MouseEvent) => {
        e.stopPropagation();
        setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    };

    return (
        <div>
            <div className="gallery-grid">
                {images.map((src, idx) => (
                    <img
                        key={src}
                        src={src}
                        alt={`Gallery ${idx + 1}`}
                        className="gallery-img"
                        onClick={() => openModal(idx)}
                        loading="lazy"
                    />
                ))}
            </div>
            {modalOpen && (
                <div className="modal-overlay" onClick={closeModal}>
                    <div className="modal-content" onClick={e => e.stopPropagation()}>
                        <button className="modal-close" onClick={closeModal} aria-label="Close">&times;</button>
                        <button className="modal-prev" onClick={showPrev} aria-label="Previous">&#8592;</button>
                        <img src={images[currentIndex]} alt={`Gallery ${currentIndex + 1}`} className="modal-img" />
                        <button className="modal-next" onClick={showNext} aria-label="Next">&#8594;</button>
                    </div>
                </div>
            )}
            <style>{`
                .gallery-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
                    gap: 12px;
                    padding: 8px;
                }
                .gallery-img {
                    width: 100%;
                    aspect-ratio: 4/3;
                    object-fit: cover;
                    border-radius: 8px;
                    cursor: pointer;
                    transition: transform 0.2s;
                }
                .gallery-img:hover {
                    transform: scale(1.03);
                }
                .modal-overlay {
                    position: fixed;
                    z-index: 1000;
                    inset: 0;
                    background: rgba(0,0,0,0.8);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                .modal-content {
                    position: relative;
                    background: #fff;
                    border-radius: 10px;
                    padding: 0;
                    max-width: 90vw;
                    max-height: 90vh;
                    display: flex;
                    align-items: center;
                }
                .modal-img {
                    max-width: 80vw;
                    max-height: 80vh;
                    border-radius: 10px;
                    display: block;
                }
                .modal-close, .modal-prev, .modal-next {
                    position: absolute;
                    background: rgba(0,0,0,0.5);
                    color: #fff;
                    border: none;
                    font-size: 2rem;
                    padding: 0.3em 0.6em;
                    border-radius: 50%;
                    cursor: pointer;
                    z-index: 2;
                }
                .modal-close {
                    top: 10px;
                    right: 10px;
                }
                .modal-prev {
                    left: 10px;
                    top: 50%;
                    transform: translateY(-50%);
                }
                .modal-next {
                    right: 10px;
                    top: 50%;
                    transform: translateY(-50%);
                }
                @media (max-width: 600px) {
                    .gallery-grid {
                        grid-template-columns: repeat(2, 1fr);
                    }
                    .modal-img {
                        max-width: 95vw;
                        max-height: 60vh;
                    }
                }
            `}</style>
        </div>
    );
};

export default ImageGallery;