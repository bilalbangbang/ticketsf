import { ImageResponse } from 'next/og';
export const alt = 'ticketSF: exploring San Francisco parking citations. 1,358,015 records in 2025. Made by Bilal J.';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export default function OpenGraphImage() {
 return new ImageResponse(
  <div style={{width:'100%',height:'100%',display:'flex',flexDirection:'column',justifyContent:'space-between',background:'#0d0f10',color:'#f6f7f7',padding:'64px',fontFamily:'sans-serif'}}>
   <div style={{display:'flex',fontSize:28,color:'#8ca6b8'}}>ticketsf.</div>
   <div style={{display:'flex',flexDirection:'column',gap:18}}>
    <div style={{display:'flex',fontSize:64,fontWeight:700}}>parking citations in</div>
    <div style={{display:'flex',fontSize:64,fontWeight:700,color:'#8ca6b8'}}>san francisco.</div>
    <div style={{display:'flex',fontSize:26,color:'#cbcdce',marginTop:16}}>1,358,015 records · 2025 historical data</div>
   </div>
   <div style={{display:'flex',fontSize:22,color:'#aaaeb0'}}>an independent data science project · made by bilal j.</div>
  </div>, size
 );
}
