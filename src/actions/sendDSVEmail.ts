'use server'
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendDSVEmail = async (formData: FormData) => {
    const name = formData.get('name')
    const email = formData.get('email')
    const cat = formData.get('category')

    resend.emails.send({
        from: 'Admin <admin@sarangsayang.com>',
        to: ['admin@sarangsayang.com', 'sales@sarangsayang.com'],
        subject: `List Me: ${name}`,
        html: `
            <div>
                <p className='capitalize'>Category: ${cat}</p>
                <p>Email: ${email}</p>
            </div>
        `
    })

}