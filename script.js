const qrTrigger = document.querySelector(".qr-trigger");
const qrLightbox = document.querySelector(".qr-lightbox");
const qrClose = document.querySelector(".qr-close");
const qrBackdrop = document.querySelector(".qr-lightbox-backdrop");
const qrLightboxContent = document.querySelector(".qr-lightbox-content");
const imageTriggers = document.querySelectorAll(".image-trigger");
const coverTrigger = document.querySelector("#cover-trigger");
const imageLightbox = document.querySelector(".image-lightbox");
const imageClose = document.querySelector(".image-close");
const imageBackdrop = document.querySelector(".image-lightbox-backdrop");
const imageLightboxContent = document.querySelector(".image-lightbox-content");
const imageLightboxPhoto = document.querySelector(".image-lightbox-photo");
const imageDownload = document.querySelector(".download-button");

function sortVideoCards() {
    const sections = document.querySelectorAll(".yt-shorts-section, .yt-grid");

    sections.forEach(function (section) {
        const cards = Array.from(section.querySelectorAll(":scope > .yt-video-card"));

        if (cards.length < 2) {
            return;
        }

        cards
            .sort(function (left, right) {
                const leftStatus = left.dataset.release === "soon" ? 1 : 0;
                const rightStatus = right.dataset.release === "soon" ? 1 : 0;

                if (leftStatus !== rightStatus) {
                    return leftStatus - rightStatus;
                }

                return 0;
            })
            .forEach(function (card) {
                section.appendChild(card);
            });
    });
}

sortVideoCards();

if (qrTrigger && qrLightbox && qrClose && qrBackdrop && qrLightboxContent) {
    function closeQrLightbox() {
        qrLightbox.hidden = true;
        document.body.classList.remove("lightbox-open");
    }

    qrTrigger.addEventListener("click", function () {
        qrLightbox.hidden = false;
        document.body.classList.add("lightbox-open");
    });

    qrClose.addEventListener("click", closeQrLightbox);
    qrBackdrop.addEventListener("click", closeQrLightbox);
    qrLightboxContent.addEventListener("click", function (event) {
        event.stopPropagation();
    });

    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape" && !qrLightbox.hidden) {
            closeQrLightbox();
        }
    });
}

if (
    (imageTriggers.length > 0 || coverTrigger) &&
    imageLightbox &&
    imageClose &&
    imageBackdrop &&
    imageLightboxContent &&
    imageLightboxPhoto
) {
    function openImageLightbox(trigger) {
        const image = trigger.querySelector("img");

        if (!image) {
            return;
        }

        imageLightboxPhoto.src = image.src;
        imageLightboxPhoto.alt = image.alt;
        if (imageDownload) {
            imageDownload.href = image.src;
            imageDownload.setAttribute("download", image.src.split("/").pop() || "afbeelding.jpg");
        }
        imageLightbox.hidden = false;
        document.body.classList.add("lightbox-open");
    }

    function closeImageLightbox() {
        imageLightbox.hidden = true;
        imageLightboxPhoto.src = "";
        imageLightboxPhoto.alt = "";
        if (imageDownload) {
            imageDownload.href = "#";
        }
        document.body.classList.remove("lightbox-open");
    }

    imageTriggers.forEach(function (trigger) {
        trigger.addEventListener("click", function (event) {
            event.preventDefault();
            openImageLightbox(trigger);
        });
    });

    if (coverTrigger) {
        coverTrigger.addEventListener("keydown", function (event) {
            if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                openImageLightbox(coverTrigger);
            }
        });
    }

    imageClose.addEventListener("click", closeImageLightbox);
    imageBackdrop.addEventListener("click", closeImageLightbox);
    imageLightboxContent.addEventListener("click", function (event) {
        event.stopPropagation();
    });

    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape" && !imageLightbox.hidden) {
            closeImageLightbox();
        }
    });
}
