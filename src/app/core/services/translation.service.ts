import { Injectable, signal, WritableSignal, effect } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { inject } from '@angular/core';

export type Language = 'en' | 'ar';

interface TranslationStrings {
    [key: string]: string | TranslationStrings;
}

@Injectable({
    providedIn: 'root'
})
export class TranslationService {
    private document = inject(DOCUMENT);

    currentLang: WritableSignal<Language> = signal(this.getStoredLanguage());

    private translations: { [lang: string]: TranslationStrings } = {
        en: {
            // Navbar
            nav: {
                home: 'Home',
                products: 'Products',
                contact: 'Contact',
                login: 'Login',
                register: 'Register',
                profile: 'Profile',
                settings: 'Settings',
                myOrders: 'My Orders',
                licenses: 'Licenses',
                logout: 'Logout',
                cart: 'Cart',
                notifications: 'Notifications',
                messages: 'Messages'
            },
            // Contact Page
            contact: {
                title: 'Get In Touch',
                subtitle: 'Have questions? We\'d love to hear from you. Send us a message and we\'ll respond as soon as possible.',
                email: 'Email',
                phone: 'Phone',
                location: 'Location',
                sendEmail: 'Send an email',
                callNow: 'Call now',
                viewMap: 'View on map',
                formTitle: 'Send us a Message',
                name: 'Full Name',
                emailAddress: 'Email Address',
                phoneNumber: 'Phone Number (Optional)',
                subject: 'Subject',
                selectSubject: 'Select a subject',
                subjects: {
                    general: 'General Inquiry',
                    support: 'Technical Support',
                    sales: 'Sales',
                    feedback: 'Feedback'
                },
                message: 'Your Message',
                send: 'Send Message',
                sending: 'Sending...',
                successMessage: 'Your message has been sent successfully! We\'ll get back to you soon.',
                errorMessage: 'Something went wrong. Please try again later.',
                nameRequired: 'Please enter your name (minimum 2 characters)',
                emailRequired: 'Please enter a valid email address',
                messageRequired: 'Please enter your message (minimum 10 characters)'
            },
            // Home Page
            home: {
                hero: {
                    title: 'Premium Automotive Parts',
                    subtitle: 'Discover the best quality car parts for your vehicle',
                    shopNow: 'Shop Now',
                    viewCatalog: 'View Catalog'
                },
                categories: {
                    title: 'Shop by Category',
                    subtitle: 'Browse our wide selection of automotive parts'
                },
                featured: {
                    title: 'Featured Products',
                    subtitle: 'Check out our most popular items',
                    viewAll: 'View All'
                },
                whyChoose: {
                    title: 'Why Choose GearZone?',
                    quality: 'Premium Quality',
                    qualityDesc: 'All our products meet the highest industry standards',
                    shipping: 'Fast Shipping',
                    shippingDesc: 'Quick and reliable delivery to your doorstep',
                    support: '24/7 Support',
                    supportDesc: 'Our team is always here to help you',
                    warranty: 'Warranty',
                    warrantyDesc: 'All products come with manufacturer warranty'
                },
                cta: {
                    title: 'Ready to upgrade your ride?',
                    subtitle: 'Join thousands of satisfied customers',
                    button: 'Start Shopping'
                }
            },
            // Products Page
            products: {
                title: 'Our Products',
                search: 'Search products...',
                allCategories: 'All Categories',
                priceRange: 'Price Range',
                addToCart: 'Add to Cart',
                outOfStock: 'Out of Stock',
                noProducts: 'No products found',
                filters: 'Filters',
                clearFilters: 'Clear Filters'
            },
            // Cart
            cart: {
                title: 'Shopping Cart',
                empty: 'Your cart is empty',
                continueShopping: 'Continue Shopping',
                subtotal: 'Subtotal',
                shipping: 'Shipping',
                total: 'Total',
                checkout: 'Proceed to Checkout',
                remove: 'Remove',
                quantity: 'Quantity'
            },
            // Auth
            auth: {
                login: 'Login',
                register: 'Register',
                email: 'Email',
                password: 'Password',
                confirmPassword: 'Confirm Password',
                firstName: 'First Name',
                lastName: 'Last Name',
                userName: 'Username',
                phone: 'Phone Number',
                rememberMe: 'Remember me',
                forgotPassword: 'Forgot Password?',
                noAccount: 'Don\'t have an account?',
                hasAccount: 'Already have an account?',
                signUp: 'Sign Up',
                signIn: 'Sign In'
            },
            // Dashboard
            dashboard: {
                profile: {
                    title: 'My Profile',
                    personalInfo: 'Personal Information',
                    updateProfile: 'Update Profile',
                    changePassword: 'Change Password'
                },
                orders: {
                    title: 'My Orders',
                    noOrders: 'You have no orders yet',
                    orderNumber: 'Order #',
                    date: 'Date',
                    status: 'Status',
                    total: 'Total',
                    viewDetails: 'View Details'
                },
                settings: {
                    title: 'Settings',
                    notifications: 'Notification Preferences',
                    privacy: 'Privacy Settings',
                    language: 'Language',
                    theme: 'Theme'
                }
            },
            // Common
            common: {
                loading: 'Loading...',
                error: 'An error occurred',
                retry: 'Retry',
                save: 'Save',
                cancel: 'Cancel',
                delete: 'Delete',
                edit: 'Edit',
                view: 'View',
                back: 'Back',
                next: 'Next',
                previous: 'Previous',
                submit: 'Submit',
                search: 'Search',
                filter: 'Filter',
                sort: 'Sort',
                asc: 'Ascending',
                desc: 'Descending'
            },
            // Footer
            footer: {
                about: 'About GearZone',
                aboutText: 'Your trusted source for premium automotive parts and accessories.',
                quickLinks: 'Quick Links',
                customerService: 'Customer Service',
                contactUs: 'Contact Us',
                faq: 'FAQ',
                returns: 'Returns Policy',
                shipping: 'Shipping Info',
                followUs: 'Follow Us',
                newsletter: 'Newsletter',
                subscribeText: 'Subscribe to get updates on new products and offers.',
                subscribe: 'Subscribe',
                emailPlaceholder: 'Enter your email',
                copyright: '© 2026 GearZone. All rights reserved.'
            }
        },
        ar: {
            // Navbar
            nav: {
                home: 'الرئيسية',
                products: 'المنتجات',
                contact: 'اتصل بنا',
                login: 'تسجيل الدخول',
                register: 'إنشاء حساب',
                profile: 'الملف الشخصي',
                settings: 'الإعدادات',
                myOrders: 'طلباتي',
                licenses: 'التراخيص',
                logout: 'تسجيل الخروج',
                cart: 'سلة التسوق',
                notifications: 'الإشعارات',
                messages: 'الرسائل'
            },
            // Contact Page
            contact: {
                title: 'تواصل معنا',
                subtitle: 'هل لديك أسئلة؟ يسعدنا سماعك. أرسل لنا رسالة وسنرد في أقرب وقت ممكن.',
                email: 'البريد الإلكتروني',
                phone: 'الهاتف',
                location: 'الموقع',
                sendEmail: 'أرسل بريد إلكتروني',
                callNow: 'اتصل الآن',
                viewMap: 'عرض على الخريطة',
                formTitle: 'أرسل لنا رسالة',
                name: 'الاسم الكامل',
                emailAddress: 'البريد الإلكتروني',
                phoneNumber: 'رقم الهاتف (اختياري)',
                subject: 'الموضوع',
                selectSubject: 'اختر موضوعاً',
                subjects: {
                    general: 'استفسار عام',
                    support: 'الدعم الفني',
                    sales: 'المبيعات',
                    feedback: 'ملاحظات'
                },
                message: 'رسالتك',
                send: 'إرسال الرسالة',
                sending: 'جاري الإرسال...',
                successMessage: 'تم إرسال رسالتك بنجاح! سنتواصل معك قريباً.',
                errorMessage: 'حدث خطأ ما. يرجى المحاولة مرة أخرى.',
                nameRequired: 'يرجى إدخال اسمك (حد أدنى حرفين)',
                emailRequired: 'يرجى إدخال بريد إلكتروني صحيح',
                messageRequired: 'يرجى إدخال رسالتك (حد أدنى 10 أحرف)'
            },
            // Home Page
            home: {
                hero: {
                    title: 'قطع غيار السيارات الفاخرة',
                    subtitle: 'اكتشف أفضل قطع الغيار لسيارتك',
                    shopNow: 'تسوق الآن',
                    viewCatalog: 'عرض الكتالوج'
                },
                categories: {
                    title: 'تسوق حسب الفئة',
                    subtitle: 'تصفح مجموعتنا الواسعة من قطع غيار السيارات'
                },
                featured: {
                    title: 'المنتجات المميزة',
                    subtitle: 'اطلع على أكثر منتجاتنا شعبية',
                    viewAll: 'عرض الكل'
                },
                whyChoose: {
                    title: 'لماذا تختار جير زون؟',
                    quality: 'جودة عالية',
                    qualityDesc: 'جميع منتجاتنا تلبي أعلى معايير الصناعة',
                    shipping: 'شحن سريع',
                    shippingDesc: 'توصيل سريع وموثوق لباب منزلك',
                    support: 'دعم على مدار الساعة',
                    supportDesc: 'فريقنا دائماً موجود لمساعدتك',
                    warranty: 'ضمان',
                    warrantyDesc: 'جميع المنتجات تأتي مع ضمان الشركة المصنعة'
                },
                cta: {
                    title: 'هل أنت جاهز لترقية سيارتك؟',
                    subtitle: 'انضم لآلاف العملاء الراضين',
                    button: 'ابدأ التسوق'
                }
            },
            // Products Page
            products: {
                title: 'منتجاتنا',
                search: 'ابحث عن المنتجات...',
                allCategories: 'جميع الفئات',
                priceRange: 'نطاق السعر',
                addToCart: 'أضف للسلة',
                outOfStock: 'غير متوفر',
                noProducts: 'لا توجد منتجات',
                filters: 'الفلاتر',
                clearFilters: 'مسح الفلاتر'
            },
            // Cart
            cart: {
                title: 'سلة التسوق',
                empty: 'سلة التسوق فارغة',
                continueShopping: 'متابعة التسوق',
                subtotal: 'المجموع الفرعي',
                shipping: 'الشحن',
                total: 'الإجمالي',
                checkout: 'إتمام الشراء',
                remove: 'إزالة',
                quantity: 'الكمية'
            },
            // Auth
            auth: {
                login: 'تسجيل الدخول',
                register: 'إنشاء حساب',
                email: 'البريد الإلكتروني',
                password: 'كلمة المرور',
                confirmPassword: 'تأكيد كلمة المرور',
                firstName: 'الاسم الأول',
                lastName: 'الاسم الأخير',
                userName: 'اسم المستخدم',
                phone: 'رقم الهاتف',
                rememberMe: 'تذكرني',
                forgotPassword: 'نسيت كلمة المرور؟',
                noAccount: 'ليس لديك حساب؟',
                hasAccount: 'لديك حساب بالفعل؟',
                signUp: 'إنشاء حساب',
                signIn: 'تسجيل الدخول'
            },
            // Dashboard
            dashboard: {
                profile: {
                    title: 'ملفي الشخصي',
                    personalInfo: 'المعلومات الشخصية',
                    updateProfile: 'تحديث الملف الشخصي',
                    changePassword: 'تغيير كلمة المرور'
                },
                orders: {
                    title: 'طلباتي',
                    noOrders: 'لا توجد لديك طلبات بعد',
                    orderNumber: 'رقم الطلب',
                    date: 'التاريخ',
                    status: 'الحالة',
                    total: 'الإجمالي',
                    viewDetails: 'عرض التفاصيل'
                },
                settings: {
                    title: 'الإعدادات',
                    notifications: 'إعدادات الإشعارات',
                    privacy: 'إعدادات الخصوصية',
                    language: 'اللغة',
                    theme: 'المظهر'
                }
            },
            // Common
            common: {
                loading: 'جاري التحميل...',
                error: 'حدث خطأ',
                retry: 'إعادة المحاولة',
                save: 'حفظ',
                cancel: 'إلغاء',
                delete: 'حذف',
                edit: 'تعديل',
                view: 'عرض',
                back: 'رجوع',
                next: 'التالي',
                previous: 'السابق',
                submit: 'إرسال',
                search: 'بحث',
                filter: 'تصفية',
                sort: 'ترتيب',
                asc: 'تصاعدي',
                desc: 'تنازلي'
            },
            // Footer
            footer: {
                about: 'عن جير زون',
                aboutText: 'مصدرك الموثوق لقطع غيار السيارات والإكسسوارات الفاخرة.',
                quickLinks: 'روابط سريعة',
                customerService: 'خدمة العملاء',
                contactUs: 'اتصل بنا',
                faq: 'الأسئلة الشائعة',
                returns: 'سياسة الإرجاع',
                shipping: 'معلومات الشحن',
                followUs: 'تابعنا',
                newsletter: 'النشرة الإخبارية',
                subscribeText: 'اشترك للحصول على تحديثات حول المنتجات الجديدة والعروض.',
                subscribe: 'اشترك',
                emailPlaceholder: 'أدخل بريدك الإلكتروني',
                copyright: '© 2026 جير زون. جميع الحقوق محفوظة.'
            }
        }
    };

    constructor() {
        // Apply initial direction and language
        this.applyLanguage(this.currentLang());
    }

    private getStoredLanguage(): Language {
        if (typeof localStorage !== 'undefined') {
            const stored = localStorage.getItem('language');
            if (stored === 'ar' || stored === 'en') {
                return stored;
            }
        }
        return 'en';
    }

    switchLanguage(): void {
        const newLang: Language = this.currentLang() === 'en' ? 'ar' : 'en';
        this.currentLang.set(newLang);
        localStorage.setItem('language', newLang);
        this.applyLanguage(newLang);
    }

    setLanguage(lang: Language): void {
        this.currentLang.set(lang);
        localStorage.setItem('language', lang);
        this.applyLanguage(lang);
    }

    private applyLanguage(lang: Language): void {
        const html = this.document.documentElement;
        html.setAttribute('lang', lang);
        html.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');

        // Update body class for styling hooks
        const body = this.document.body;
        body.classList.remove('lang-en', 'lang-ar');
        body.classList.add(`lang-${lang}`);
    }

    translate(key: string): string {
        const keys = key.split('.');
        let value: any = this.translations[this.currentLang()];

        for (const k of keys) {
            if (value && typeof value === 'object' && k in value) {
                value = value[k];
            } else {
                // Fallback to English if key not found
                value = this.getEnglishFallback(key);
                break;
            }
        }

        return typeof value === 'string' ? value : key;
    }

    private getEnglishFallback(key: string): string {
        const keys = key.split('.');
        let value: any = this.translations['en'];

        for (const k of keys) {
            if (value && typeof value === 'object' && k in value) {
                value = value[k];
            } else {
                return key;
            }
        }

        return typeof value === 'string' ? value : key;
    }

    isRTL(): boolean {
        return this.currentLang() === 'ar';
    }
}
