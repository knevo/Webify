import GenericText from '../GenericText'
import Input from '../Input'
import Button from '../Button'
import GenericSection from '../GenericSection'
export default () => {
    return {
        cmpName: 'Form',
        htmlTagName: 'form',
        role: 'form',
        prefs: {
            method: 'post',
            style: {
                padding: '20px 30px 20px 30px',
                flexDirection: 'column',
                maxWidth: '530px',
                flexGrow: '1'
            }
        },
        children: [
            GenericText(['Name: '], {}),
            Input({ name: 'fullName', placeholder: 'John Due' }),
            GenericText(['Your Email: '], {}),
            Input({ name: 'email', type: 'email', placeholder: 'John@gmail.com' }),
            GenericText(['Phone Number: '], {}),
            Input({ name: 'phone', type: 'tel', placeholder: '+972-52-823-5428' }),
            GenericText(['Subject: '], {}),
            Input({ name: 'subject', placeholder: 'Enter Your Subject' }),
            GenericText(['Enter Your Message Here: '], {}),
            Input({ name: 'content', placeholder: 'Your Message', tagName: 'textarea' }, { minHeight: '100px' }),
            GenericSection(undefined, [Button(['Submit'], { backgroundColor: 'rgb(99, 194, 185)', color: '#FFF', fontFamily: 'Nunito' })],
                { padding: '2px', justifyContent: 'flex-end' })
        ]
    }
}
