import { NextResponse } from 'next/server';

// TODO: Resend inteqrasiyası üçün aşağıdakı addımları izleyin:
// 1. resend.com saytında hesab açın, API key alın
// 2. .env.local faylına əlavə edin: RESEND_API_KEY=re_xxxxx
// 3. Aşağıdakı commented-out kodun şərhini götürün

// import { Resend } from 'resend';
// const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, pkg, message } = body;

    // Validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Ad, email və mesaj sahələri mütləqdir.' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Düzgün email ünvanı daxil edin.' },
        { status: 400 }
      );
    }

    // TODO: Resend ilə email göndər
    // await resend.emails.send({
    //   from: 'Alhezars Sayt <noreply@alhezars.com>',
    //   to: 'info@alhezars.com',
    //   subject: `Yeni Müraciət: ${name}`,
    //   html: `
    //     <h2>Yeni Müraciət</h2>
    //     <p><strong>Ad Soyad:</strong> ${name}</p>
    //     <p><strong>Email:</strong> ${email}</p>
    //     <p><strong>Telefon:</strong> ${phone || 'Göstərilməyib'}</p>
    //     <p><strong>Maraq duyulan paket:</strong> ${pkg || 'Göstərilməyib'}</p>
    //     <p><strong>Mesaj:</strong></p>
    //     <p>${message}</p>
    //   `,
    // });

    // Geçici: sadece log
    console.log('Yeni müraciət:', { name, email, phone, pkg, message });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: 'Xəta baş verdi. Zəhmət olmasa yenidən cəhd edin.' },
      { status: 500 }
    );
  }
}
