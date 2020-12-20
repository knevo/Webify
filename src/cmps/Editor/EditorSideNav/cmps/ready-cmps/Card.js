import Img from '../Img';
import GenericText from '../GenericText';

export default () => {
    return {
        cmpName: 'Card',
        htmlTagName: 'div',
        role: 'card',
        prefs: {
            style: {
                fontSize: '16px',
                padding: '12px',
                textAlign: 'center',
                flexDirection: 'column'
            }
        },
        children: [
            Img('/images/upload-your-image.jpg'),
            GenericText()]
    }
}
