"use client"

import { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Loader2, Send, CheckCircle, AlertCircle } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguageContext } from '@/contexts/LanguageContext'

// Schema validation
const formSchema = z.object({
    name: z.string().trim().min(2, { message: "Name must be at least 2 characters" }),
    email: z.string().trim().email({ message: "Invalid email address" }),
    message: z.string().trim().min(10, { message: "Message must be at least 10 characters" }),
})

type FormData = z.infer<typeof formSchema>

export default function ContactForm() {
    const { language } = useLanguageContext()
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
    const [errorMessage, setErrorMessage] = useState('')
    const resetTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
    const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_KEY

    const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>({
        resolver: zodResolver(formSchema),
    })

    const translations = {
        name: { es: 'Nombre', en: 'Name' },
        email: { es: 'Correo Electrónico', en: 'Email' },
        message: { es: 'Mensaje', en: 'Message' },
        send: { es: 'Enviar Mensaje', en: 'Send Message' },
        sending: { es: 'Enviando...', en: 'Sending...' },
        success: { es: '¡Mensaje enviado!', en: 'Message sent!' },
        successDesc: { es: 'Gracias por ponerte en contacto. Te responderé en 24 horas.', en: 'Thanks for reaching out. I will get back to you within 24 hours.' },
        error: { es: 'Error al enviar', en: 'Error sending' },
        errorRetry: { es: 'Error de red. Por favor intenta de nuevo.', en: 'Network error. Please try again.' },
        placeholderName: { es: 'Tu nombre', en: 'Your name' },
        placeholderEmail: { es: 'nombre@ejemplo.com', en: 'name@example.com' },
        placeholderMessage: { es: '¿Cómo puedo ayudarte?', en: 'How can I help you?' },
        privacy: { es: 'Tu correo es privado y seguro. No lo compartiré con terceros.', en: 'Your email is private and secure. I will not share it with anyone.' },
        sendAnother: { es: 'Enviar otro mensaje', en: 'Send another message' },
        missingKey: { es: 'Falta configurar la clave de envío. Agrega NEXT_PUBLIC_WEB3FORMS_KEY en tu .env.', en: 'Missing form key. Add NEXT_PUBLIC_WEB3FORMS_KEY in your .env.' },
    }

    const t = (key: keyof typeof translations) => translations[key][language as 'es' | 'en']
    const isSubmitting = status === 'submitting'

    const clearResetTimer = () => {
        if (resetTimerRef.current) {
            clearTimeout(resetTimerRef.current)
            resetTimerRef.current = null
        }
    }

    const scheduleStatusReset = () => {
        clearResetTimer()
        resetTimerRef.current = setTimeout(() => setStatus('idle'), 5000)
    }

    useEffect(() => {
        return () => clearResetTimer()
    }, [])

    const onSubmit = async (data: FormData) => {
        clearResetTimer()
        setErrorMessage('')
        setStatus('submitting')

        try {
            if (!accessKey) {
                setStatus('error')
                setErrorMessage(t('missingKey'))
                scheduleStatusReset()
                return
            }

            // Using Web3Forms for serverless email submission
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    access_key: accessKey,
                    ...data,
                    subject: `New submission from ${data.name}`,
                })
            });

            if (!response.ok) {
                throw new Error('Network response was not ok')
            }

            const result = await response.json();

            if (result.success) {
                setStatus('success')
                reset()
                // Reset status after 5 seconds to allow sending another
                scheduleStatusReset()
            } else {
                throw new Error(result.message || 'Something went wrong')
            }
        } catch {
            setStatus('error')
            setErrorMessage(t('errorRetry'))
            scheduleStatusReset()
        }
    }

    return (
        <div className="w-full max-w-md mx-auto bg-[var(--card)] border border-[var(--border)] rounded-2xl p-6 md:p-8 shadow-xl backdrop-blur-sm">
            <AnimatePresence mode="wait">
                {status === 'success' ? (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="flex flex-col items-center justify-center text-center py-8"
                        role="status"
                        aria-live="polite"
                    >
                        <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-4 text-green-600 dark:text-green-400">
                            <CheckCircle size={32} />
                        </div>
                        <h3 className="text-2xl font-bold mb-2 text-[var(--foreground)]">{t('success')}</h3>
                        <p className="text-[var(--foreground)]/70">{t('successDesc')}</p>
                        <button
                            onClick={() => {
                                clearResetTimer()
                                setStatus('idle')
                            }}
                            className="mt-6 text-sm text-[var(--link)] hover:underline"
                        >
                            {t('sendAnother')}
                        </button>
                    </motion.div>
                ) : (
                    <motion.form
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onSubmit={handleSubmit(onSubmit)}
                        className="space-y-4"
                        aria-busy={isSubmitting}
                    >
                        {/* Name Field */}
                        <div className="space-y-2">
                            <label htmlFor="name" className="text-sm font-medium text-[var(--foreground)]">
                                {t('name')}
                            </label>
                            <input
                                id="name"
                                {...register("name")}
                                required
                                placeholder={t('placeholderName')}
                                autoComplete="name"
                                aria-invalid={Boolean(errors.name)}
                                aria-describedby={errors.name ? 'name-error' : undefined}
                                disabled={isSubmitting}
                                className="w-full px-4 py-2 rounded-lg border border-[var(--border)] bg-[var(--background)]/50 text-[var(--foreground)] focus:ring-2 focus:ring-[var(--link)] focus:border-transparent transition-all outline-none"
                            />
                            {errors.name && (
                                <p id="name-error" className="text-red-500 text-xs flex items-center gap-1" role="alert">
                                    <AlertCircle size={12} /> {errors.name.message}
                                </p>
                            )}
                        </div>

                        {/* Email Field */}
                        <div className="space-y-2">
                            <label htmlFor="email" className="text-sm font-medium text-[var(--foreground)]">
                                {t('email')}
                            </label>
                            <input
                                id="email"
                                type="email"
                                {...register("email")}
                                required
                                placeholder={t('placeholderEmail')}
                                autoComplete="email"
                                inputMode="email"
                                aria-invalid={Boolean(errors.email)}
                                aria-describedby={errors.email ? 'email-error' : undefined}
                                disabled={isSubmitting}
                                className="w-full px-4 py-2 rounded-lg border border-[var(--border)] bg-[var(--background)]/50 text-[var(--foreground)] focus:ring-2 focus:ring-[var(--link)] focus:border-transparent transition-all outline-none"
                            />
                            {errors.email && (
                                <p id="email-error" className="text-red-500 text-xs flex items-center gap-1" role="alert">
                                    <AlertCircle size={12} /> {errors.email.message}
                                </p>
                            )}
                        </div>

                        {/* Message Field */}
                        <div className="space-y-2">
                            <label htmlFor="message" className="text-sm font-medium text-[var(--foreground)]">
                                {t('message')}
                            </label>
                            <textarea
                                id="message"
                                {...register("message")}
                                required
                                placeholder={t('placeholderMessage')}
                                rows={4}
                                autoComplete="off"
                                aria-invalid={Boolean(errors.message)}
                                aria-describedby={errors.message ? 'message-error' : undefined}
                                disabled={isSubmitting}
                                className="w-full px-4 py-2 rounded-lg border border-[var(--border)] bg-[var(--background)]/50 text-[var(--foreground)] focus:ring-2 focus:ring-[var(--link)] focus:border-transparent transition-all outline-none resize-none"
                            />
                            {errors.message && (
                                <p id="message-error" className="text-red-500 text-xs flex items-center gap-1" role="alert">
                                    <AlertCircle size={12} /> {errors.message.message}
                                </p>
                            )}
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-[var(--link)] hover:bg-[var(--link-hover)] text-white rounded-lg font-medium transition-all shadow-lg hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed transform hover:-translate-y-0.5 active:translate-y-0"
                        >
                            {isSubmitting ? (
                                <>
                                    <Loader2 size={18} className="animate-spin" />
                                    {t('sending')}
                                </>
                            ) : (
                                <>
                                    {t('send')}
                                    <Send size={18} />
                                </>
                            )}
                        </button>

                        {/* Status Message */}
                        {status === 'error' && (
                            <div className="flex items-center gap-2 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg mt-3" role="alert" aria-live="polite">
                                <AlertCircle size={16} className="text-red-600 dark:text-red-400 flex-shrink-0" />
                                <p className="text-red-700 dark:text-red-300 text-sm">
                                    {errorMessage || t('errorRetry')}
                                </p>
                            </div>
                        )}

                        <p className="text-xs text-[var(--foreground)]/50 text-center mt-4">
                            {t('privacy')}
                        </p>
                        <p className="text-xs text-[var(--foreground)]/30 text-center">
                            Powered by Web3Forms
                        </p>
                    </motion.form>
                )}
            </AnimatePresence>
        </div>
    )
}
