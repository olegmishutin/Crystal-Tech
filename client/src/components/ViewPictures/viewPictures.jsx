import './viewPictures.css'

export default function ViewPictures() {
    return (
        <>
            <div className="picture_view showed_picture_view" id='pictureView'>
                <div className="picture_view__image">
                    <img alt='picture' id='pictureView_picture'/>
                </div>
                <button className='picture_view__close_button' onClick={closeViewPictures}>x</button>
            </div>
        </>
    )
}

export function openViewPictures(src) {
    const pictureView = document.getElementById('pictureView')
    pictureView.className = 'picture_view showed_picture_view'

    const picture = document.getElementById('pictureView_picture')
    picture.src = src
}

export function closeViewPictures() {
    const pictureView = document.getElementById('pictureView')
    pictureView.className = 'picture_view'
}