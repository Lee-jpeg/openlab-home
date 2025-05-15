import { NextResponse } from 'next/server';

// Slack API 토큰은 환경 변수에서 가져오도록 수정
const SLACK_TOKEN = process.env.SLACK_API_TOKEN || "";
const SLACK_CHANNEL = process.env.SLACK_CHANNEL || "C08RZ8E0FV5";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, subject, message } = body;
    
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { success: false, message: '모든 필드를 입력해주세요.' },
        { status: 400 }
      );
    }
    
    // Slack 메시지 형식
    const slackMessage = {
      channel: SLACK_CHANNEL,
      blocks: [
        {
          type: 'header',
          text: {
            type: 'plain_text',
            text: `📬 새로운 문의: ${subject}`,
            emoji: true
          }
        },
        {
          type: 'divider'
        },
        {
          type: 'section',
          fields: [
            {
              type: 'mrkdwn',
              text: `*이름:*\n${name}`
            },
            {
              type: 'mrkdwn',
              text: `*이메일:*\n${email}`
            }
          ]
        },
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: `*문의 내용:*\n${message}`
          }
        },
        {
          type: 'context',
          elements: [
            {
              type: 'mrkdwn',
              text: `웹사이트를 통해 ${new Date().toLocaleString('ko-KR')}에 전송됨`
            }
          ]
        }
      ]
    };
    
    // Slack API 호출
    const response = await fetch('https://slack.com/api/chat.postMessage', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${SLACK_TOKEN}`
      },
      body: JSON.stringify(slackMessage)
    });
    
    const slackResponse = await response.json();
    
    if (!slackResponse.ok) {
      console.error('Slack API 오류:', slackResponse);
      return NextResponse.json(
        { success: false, message: '문의 전송 중 오류가 발생했습니다.' },
        { status: 500 }
      );
    }
    
    return NextResponse.json({ 
      success: true, 
      message: '문의가 성공적으로 전송되었습니다. 빠른 시일 내에 답변 드리겠습니다.' 
    });
    
  } catch (error) {
    console.error('문의 전송 오류:', error);
    return NextResponse.json(
      { success: false, message: '서버 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
} 