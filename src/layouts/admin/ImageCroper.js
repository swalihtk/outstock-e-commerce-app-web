import React, { useState } from 'react'
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';


function ImageCroper(props) {


    const {imageToCrop, setBoolean, setPreview, aspectRatio} = props;

    // state
    const [cropConfig, setCropConfig] = useState(
        // default crop config
        {
            unit: '%',
            width: 300,
            aspect: aspectRatio,
        }
    );
    let [result, setResult]=useState("");
    const [imageRef, setImageRef] = useState();

    async function cropImage(crop){
       
        if (imageRef && crop.width && crop.height) {
            const croppedImage = await getCroppedImage(
                imageRef,
                crop,
                'croppedImage.jpeg' // destination filename
            );

            // calling the props function to expose
            // croppedImage to the parent component
            setResult(croppedImage);
           
        }
    }

    function closeCroping(){
        setPreview(result);
        setBoolean(false);
    }

    function getCroppedImage(sourceImage, cropConfig, fileName) {
        // creating the cropped image from the source image
        const canvas = document.createElement('canvas');
        const scaleX = sourceImage.naturalWidth / sourceImage.width;
        const scaleY = sourceImage.naturalHeight / sourceImage.height;
        canvas.width = cropConfig.width;
        canvas.height = cropConfig.height;
        const ctx = canvas.getContext('2d');
        console.log(cropConfig.width+" ----------------- "+cropConfig.height)
        ctx.drawImage(
            sourceImage,
            cropConfig.x * scaleX,
            cropConfig.y * scaleY,
            cropConfig.width * scaleX,
            cropConfig.height * scaleY,
            0,
            0,
            cropConfig.width,
            cropConfig.height
        );

        return canvas.toDataURL();
    }



    return (
        <div className="croper__main">
        <ReactCrop
            src={imageToCrop || ""}
            crop={cropConfig}
            ruleOfThirds
            onImageLoaded={(imageRef) => setImageRef(imageRef)}
            onComplete={(cropConfig) => cropImage(cropConfig)}
            onChange={(cropConfig) => setCropConfig(cropConfig)}
            crossorigin="anonymous" // to avoid CORS-related problems
        />
        <div className="crop__button">
        <button onClick={closeCroping}>DONE</button>
        </div>
        </div>
    )
}

ImageCroper.defaultProps = {
    onImageCropped: () => {}
}

export default ImageCroper
