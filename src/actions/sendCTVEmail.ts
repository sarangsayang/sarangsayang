'use server'
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendCTVEmail = async (formData: FormData) => {
    const name = formData.get('name')
    const email = formData.get('email')
    const contact = formData.get('contact')
    const vendor = formData.get('vendor')

    resend.emails.send({
        from: 'Admin <admin@sarangsayang.com>',
        to: ['admin@sarangsayang.com', 'sales@sarangsayang.com'],
        subject: `Give Me Access: ${vendor}`,
        html: `
            <div>
                <p>Name: ${name}</p>
                <p className='capitalize'>Contact: ${contact}</p>
                <p>Email: ${email}</p>
            </div>
        `
    })

}