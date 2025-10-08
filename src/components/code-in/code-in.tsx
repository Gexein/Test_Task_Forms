import { Form, Input, Typography, Button, Flex } from "antd";
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useEffect, useState } from "react";
import LogoSrc from '../../assets/logo.svg';
import cn from "classnames";
import type { CodeInFormProps } from "./code-in.props";



export function CodeInForm({ pass, getBack, className, ...props }: CodeInFormProps) {
    const [isCorrect, setIsCorrect] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [otpStatus, setOtpStatus] = useState<'success' | 'error' | 'validating' | ''>('')
    const [otpHelp, setOtpHelp] = useState('')
    const [timeIsUp, setTimeIsUp] = useState(false)
    const [form] = Form.useForm()
    const values = Form.useWatch([], form);

    useEffect(() => {
        setOtpStatus('')
        setOtpHelp('')
        form.validateFields()
            .then(() => { setIsCorrect(true); setTimeIsUp(false) })
            .catch(() => setIsCorrect(false))
    }, [values])

    useEffect(() => {
        if (!isCorrect) {
            const to = setTimeout(() => {
                setTimeIsUp(true)
            }, 3000)
            return () => clearTimeout(to)
        }

    }, [isCorrect])

    const onFinish = async (values: { otp: string }) => {
        setIsLoading(true);
        try {
            await new Promise(resolve => setTimeout(resolve, 1000));

            if (values.otp === '123456') {
                setOtpHelp('Success!')
                setOtpStatus('success')
                setTimeout(() => {
                    pass();
                }, 1500)
            } else {
                setIsCorrect(false)
                setOtpHelp('Invalid code')
                setOtpStatus('error')
            }
        } catch {
            setIsCorrect(false)
            setOtpHelp('Verification failed')
            setOtpStatus('error')
        } finally {
            setIsLoading(false);
        }
    };


    return <div className={cn("flex flex-col items-center justify-center rounded-[6px] bg-[#fff] p-[32px] gap-[24px] relative", className)} {...props}>
        <button
            className="bg-transparent outline-none border-none p-0 absolute top-[40px] left-[40px]"
            onClick={getBack}>
            <ArrowLeftOutlined height={13} />
        </button>
        <div className="flex gap-[10px] items-center justify-center h-[64px]">
            <img src={LogoSrc} alt="Logo" height={24} />
            <Typography style={{ fontWeight: '600', fontSize: '20px' }}>
                Company
            </Typography>
        </div>
        <div className="flex flex-col gap-[4px]">
            <Typography style={{ fontSize: '24px', fontWeight: '600', maxWidth: '376px', textAlign: 'center', fontFamily: 'var(--font)', lineHeight: '133%' }}>
                Two-Factor Authentication
            </Typography>
            <Typography
                style={{ fontSize: '16px', fontWeight: '400', maxWidth: '376px', textAlign: 'center', fontFamily: 'var(--font)', lineHeight: '150%' }}>
                Enter the 6-digit code from the Google Authenticator app
            </Typography>
        </div>
        <Form
            className="w-full min-[468px]:w-[376px] items-stretch justify-center flex"
            autoComplete="off"
            onFinish={onFinish}
            form={form}>
            <Flex className="items-center justify-center gap-[16px] flex-col">
                <Form.Item
                    className="otp-group"
                    name='otp'
                    rules={[
                        { required: true, message: 'Please enter code' },
                    ]}
                    validateStatus={otpStatus}
                    help={otpHelp}
                >
                    <Input.OTP length={6}
                        onChange={(value) => form.setFieldValue('otp', value)} />
                </Form.Item>

                {timeIsUp
                    ? <Button size="large" style={{ width: '100%' }} type="primary" onClick={() => setTimeIsUp(false)}>Get new</Button>
                    : isCorrect
                        ? isCorrect && <Button size="large" style={{ width: '100%' }} type="primary" disabled={isLoading} htmlType="submit">Continue</Button>
                        : ''}
            </Flex>
        </Form>
    </div>
}





