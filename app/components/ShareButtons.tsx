'use client'

import { PropertyApiGet } from "@/types/property"
import {
    EmailShareButton,
    FacebookShareButton,
    LinkedinShareButton,
    TwitterShareButton,
    WhatsappShareButton,
    FacebookIcon,
    LinkedinIcon,
    TwitterIcon,
    WhatsappIcon,
    EmailIcon
} from 'react-share'

const ShareButtons: React.FC<{property: PropertyApiGet}> = ({ property }) => {
    const shareUrl = `${process.env.NEXT_PUBLIC_DOMAIN}/properties/${property._id}`
    const shareTitle = property.name
    const hashtag = `#${property.type.replace(/\s/g, '')}ForRent`

    return (
        <>
        <h3 className="text-xl font-bold text-center pt-2">
            Share this property:
        </h3>
        <div className="flex gap-3 justify-center pb-5">
            <FacebookShareButton 
                url={shareUrl} 
                hashtag={hashtag}
            >
                <FacebookIcon size={32} round={true} />
            </FacebookShareButton>
            <TwitterShareButton 
                url={shareUrl} 
                title={shareTitle}
                hashtags={[hashtag]}
            >
                <TwitterIcon size={32} round={true} />
            </TwitterShareButton>

            <LinkedinShareButton 
                url={shareUrl} 
                title={shareTitle}
            >
                <LinkedinIcon size={32} round={true} />
            </LinkedinShareButton>

            <WhatsappShareButton 
                url={shareUrl} 
                title={shareTitle}
            >
                <WhatsappIcon size={32} round={true} />
            </WhatsappShareButton>

            <EmailShareButton 
                url={shareUrl} 
                subject={shareTitle}
                body={`Check out this property: ${shareUrl}`}
            >
                <EmailIcon size={32} round={true} />
            </EmailShareButton>
        </div>
        </>
    )
}

export default ShareButtons