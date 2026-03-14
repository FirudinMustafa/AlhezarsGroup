import { NextResponse } from 'next/server';

// TODO: Resend inteqrasiyası üçün aşağıdakı addımları izleyin:
// 1. resend.com saytında hesab açın, API key alın
// 2. .env.local faylına əlavə edin: RESEND_API_KEY=re_xxxxx
// 3. Aşağıdakı commented-out kodun şərhini götürün

// import { Resend } from 'resend';
// const resend = new Resend(process.env.RESEND_API_KEY);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

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
    // const safeName = escapeHtml(name);
    // const safeEmail = escapeHtml(email);
    // const safePhone = escapeHtml(phone || '');
    // const safePkg = escapeHtml(pkg || '');
    // const safeMessage = escapeHtml(message);
    //
    // await resend.emails.send({
    //   from: 'Alhezars Sayt <noreply@alhezars.com>',
    //   to: 'info@alhezars.com',
    //   subject: `Yeni Müraciət: ${safeName}`,
    //   html: `
    //     <h2>Yeni Müraciət</h2>
    //     <p><strong>Ad Soyad:</strong> ${safeName}</p>
    //     <p><strong>Email:</strong> ${safeEmail}</p>
    //     <p><strong>Telefon:</strong> ${safePhone || 'Göstərilməyib'}</p>
    //     <p><strong>Maraq duyulan paket:</strong> ${safePkg || 'Göstərilməyib'}</p>
    //     <p><strong>Mesaj:</strong></p>
    //     <p>${safeMessage}</p>
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
