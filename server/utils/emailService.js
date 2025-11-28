import nodemailer from 'nodemailer';

// Create transporter
const createTransporter = () => {
  return nodemailer.createTransporter({
    service: process.env.EMAIL_SERVICE,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
};

// Send order confirmation email
export const sendOrderConfirmation = async (order, user) => {
  try {
    const transporter = createTransporter();

    const impactMessage = `
      Your sustainable purchase has made a positive impact:
      - Carbon Reduced: ${order.sustainabilityImpact.totalCarbonFootprint} kg CO₂
      - Water Saved: ${order.sustainabilityImpact.totalWaterSaved} liters
      - Energy Saved: ${order.sustainabilityImpact.totalEnergySaved} kWh
      - Trees Equivalent: ${order.sustainabilityImpact.treesSaved} trees
    `;

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: `Order Confirmation - ${order.orderNumber}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #16a34a;">Thank you for your sustainable purchase!</h2>
          <p>Hello ${user.name},</p>
          <p>Your order <strong>${order.orderNumber}</strong> has been confirmed.</p>
          
          <h3>Order Details:</h3>
          <ul>
            ${order.items.map(item => `
              <li>${item.product.name} - $${item.price} x ${item.quantity}</li>
            `).join('')}
          </ul>
          
          <p><strong>Total Amount: $${order.totalAmount}</strong></p>
          
          <div style="background-color: #f0fdf4; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #16a34a; margin-top: 0;">🌱 Environmental Impact</h3>
            <p>${impactMessage}</p>
          </div>
          
          <p>Thank you for supporting sustainable consumption!</p>
          <p>Best regards,<br>The EcoMarket Team</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log('Order confirmation email sent to:', user.email);
  } catch (error) {
    console.error('Error sending order confirmation email:', error);
    throw error;
  }
};

// Send sustainability impact report
export const sendImpactReport = async (user, impactData, period = 'monthly') => {
  try {
    const transporter = createTransporter();

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: `Your ${period} Sustainability Impact Report`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #16a34a;">Your Sustainability Impact Report</h2>
          <p>Hello ${user.name},</p>
          <p>Here's your ${period} impact report:</p>
          
          <div style="background-color: #f0fdf4; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #16a34a; margin-top: 0;">📊 Your Impact This ${period.charAt(0).toUpperCase() + period.slice(1)}</h3>
            <ul style="list-style: none; padding: 0;">
              <li style="margin: 10px 0;">🌿 <strong>Carbon Reduced:</strong> ${impactData.totalCarbonReduced} kg CO₂</li>
              <li style="margin: 10px 0;">💧 <strong>Water Saved:</strong> ${impactData.totalWaterSaved} liters</li>
              <li style="margin: 10px 0;">⚡ <strong>Energy Saved:</strong> ${impactData.totalEnergySaved} kWh</li>
              <li style="margin: 10px 0;">🌳 <strong>Trees Equivalent:</strong> ${impactData.treesEquivalent} trees</li>
            </ul>
          </div>
          
          <p>Keep up the great work in supporting sustainable consumption!</p>
          <p>Together, we're making a difference for our planet. 🌎</p>
          
          <p>Best regards,<br>The EcoMarket Team</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log('Impact report email sent to:', user.email);
  } catch (error) {
    console.error('Error sending impact report email:', error);
    throw error;
  }
};

// Send vendor registration confirmation
export const sendVendorWelcome = async (user) => {
  try {
    const transporter = createTransporter();

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: 'Welcome to EcoMarket Vendor Program',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #16a34a;">Welcome to EcoMarket Vendor Program!</h2>
          <p>Hello ${user.name},</p>
          <p>Thank you for joining our community of sustainable vendors.</p>
          
          <div style="background-color: #f0fdf4; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #16a34a; margin-top: 0;">Next Steps:</h3>
            <ul>
              <li>Set up your vendor profile</li>
              <li>Add your sustainable products</li>
              <li>Review our sustainability guidelines</li>
              <li>Start reaching conscious consumers</li>
            </ul>
          </div>
          
          <p>We're excited to have you on board!</p>
          <p>Best regards,<br>The EcoMarket Team</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log('Vendor welcome email sent to:', user.email);
  } catch (error) {
    console.error('Error sending vendor welcome email:', error);
    throw error;
  }
};