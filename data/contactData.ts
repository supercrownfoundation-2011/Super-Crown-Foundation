export interface ContactInfo {
  institutionName: string;
  address: string;
  shortAddress: string;
  addressLines: string[];
  phones: {
    display: string;
    tel: string;
  }[];
  googleMapsUrl: string;
  email: string;
  officeHours: string;
  whatsapp: {
    phone: string;
    display: string;
    url: string;
  };
  socials: {
    instagram: string;
    facebook: string;
    linkedin: string;
    youtube: string;
  };
}

export const CONTACT_INFO: ContactInfo = {
  institutionName: "Super Crown International Montessori Teacher Training School",
  address:
    "No 16&, 17A, Old Twp Rd, Secretariat Colony, Venkatapuram, Ambattur, Chennai, Tamil Nadu 600053",
  shortAddress: "Ambattur, Chennai, Tamil Nadu 600053",
  addressLines: [
    "No 16&, 17A, Old Twp Rd",
    "Secretariat Colony, Venkatapuram",
    "Ambattur, Chennai, Tamil Nadu 600053",
  ],
  phones: [
    {
      display: "+91 86670 43942",
      tel: "+918667043942",
    },
    {
      display: "+91 96001 51377",
      tel: "+919600151377",
    },
  ],
  googleMapsUrl:
    "https://www.google.com/maps/place/Super+Crown+International+Montessori+Teacher+Training+School/@13.1217365,80.1493014,17z/data=!3m1!4b1!4m22!1m15!4m14!1m6!1m2!1s0x3a5263e92321ba7f:0x93db82761cabfb8e!2sSuper+Crown+International+Montessori+Teacher+Training+School,+No+16%26,+17A,+Old+Twp+Rd,+Secretariat+Colony,+Venkatapuram,+Ambattur,+Chennai,+Tamil+Nadu+600053!2m2!1d80.1493101!2d13.1217054!1m6!1m2!1s0x3a5263e92321ba7f:0x93db82761cabfb8e!2sSuper+Crown+International+Montessori+Teacher+Training+School,+No+16%26,+17A,+Old+Twp+Rd,+Secretariat+Colony,+Venkatapuram,+Ambattur,+Chennai,+Tamil+Nadu+600053!2m2!1d80.1493101!2d13.1217054!3m5!1s0x3a5263e92321ba7f:0x93db82761cabfb8e!8m2!3d13.1217365!4d80.1493014!16s%2Fg%2F11njwwfwyd?entry=ttu&g_ep=EgoyMDI2MTExMC4wIKXMDSoASAFQAw%3D%3D",
  email: "supercrownfoundation@gmail.com",
  officeHours: "Mon - Sat: 9:00 AM – 6:00 PM",
  whatsapp: {
    phone: "919600151377",
    display: "96001 51377",
    url: "https://wa.me/919600151377?text=Hello%20Super%20Crown%20Foundation!%20I%20would%20like%20to%20enquire%20about%20your%20Montessori%20Teacher%20Training%20programs.",
  },
  socials: {
    instagram: "https://www.instagram.com/supercrown.foundation/",
    facebook: "https://www.facebook.com/p/Super-Crown-Foundation-61590255278191/",
    linkedin: "https://www.linkedin.com/in/super-crown-foundation-07b011425/",
    youtube: "https://www.youtube.com/channel/UCv_bIE7CEYDNWhAu1R21tcw",
  },
};
