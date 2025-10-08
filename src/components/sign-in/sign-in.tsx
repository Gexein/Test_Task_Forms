import { Form, Input, Typography, Button } from "antd";
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useEffect, useState } from "react";
import LogoSrc from '../../assets/logo.svg';
import type { SignInFormProps } from "./sign-in.props";
import cn from "classnames";



export function SignInForm({ sign, className, ...props }: SignInFormProps) {
    const [isCorrect, setIsCorrect] = useState(false)
    const [form] = Form.useForm()
    const values = Form.useWatch([], form);

    useEffect(() => {
        form.validateFields({ validateOnly: true })
            .then(() => setIsCorrect(true))
            .catch(() => setIsCorrect(false))
    }, [values])

    const onFinish = () => {
        sign()
    }
    return (
        <div className={cn("flex flex-col items-center justify-center rounded-[6px] bg-[#fff] p-[32px] gap-[24px]", className)} {...props}>
            <div className="flex gap-[10px] items-center justify-center h-[64px]">
                <img src={LogoSrc} alt="Logo" height={24} />
                <Typography style={{ fontWeight: '600', fontSize: '20px' }}>
                    Company
                </Typography>
            </div>
            <Typography style={{ fontSize: '24px', fontWeight: '600', maxWidth: '376px', textAlign: 'center', fontFamily: 'var(--font)', lineHeight: '133%' }}>
                Sign in to your account to continue
            </Typography>
            <Form
                className="w-full min-[468px]:w-[376px]"
                autoComplete="off"
                onFinish={onFinish}
                form={form}>
                <Form.Item
                    name="email"
                    rules={[
                        { required: true, message: 'Please input your email!' },
                        { type: 'email', message: 'Please enter a valid email address!' }
                    ]}>
                    <Input placeholder="Email" size="large" prefix={<UserOutlined style={{ color: 'rgba(0, 0, 0, 0.45)' }} />} />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[
                        { required: true, message: 'Please input your password!' },
                        { min: 6, message: 'Password must be at least 6 characters!' }
                    ]}>
                    <Input.Password placeholder="Password" size="large" prefix={<LockOutlined style={{ color: 'rgba(0, 0, 0, 0.45)' }} />} visibilityToggle={false} />
                </Form.Item>
                <Form.Item
                    name="submit"
                    style={{ margin: 0 }}>
                    <Button size="large" style={{ width: '100%' }} type="primary" disabled={!isCorrect} htmlType="submit">Log in</Button>
                </Form.Item>
            </Form>
        </div>
    )
}