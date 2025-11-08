// utils/reinitWebflow.js
export default function reinitWebflow() {
    try {
      if (!window.Webflow) {
        console.warn('⚠️ Webflow not available on window.');
        return;
      }
  
      // 1️⃣ Destroy existing Webflow bindings (to avoid double events)
      if (typeof window.Webflow.destroy === 'function') {
        window.Webflow.destroy();
      }
  
      // 2️⃣ Reinitialize IX2 animations
      if (window.Webflow.require) {
        const ix2 = window.Webflow.require('ix2');
        if (ix2 && typeof ix2.init === 'function') {
          ix2.init();
        }
      }
  
      // 3️⃣ Reinitialize forms (this is the key part)
      if (window.Webflow.require) {
        const wfForms = window.Webflow.require('forms');
        if (wfForms && typeof wfForms.ready === 'function') {
          wfForms.ready();
        }
      }
  
      // 4️⃣ Trigger Webflow.ready() for components like sliders, tabs, etc.
      if (typeof window.Webflow.ready === 'function') {
        window.Webflow.ready();
      }
  
      // 5️⃣ Dispatch DOMContentLoaded to simulate a fresh page load
      const domEvent = document.createEvent('Event');
      domEvent.initEvent('DOMContentLoaded', true, true);
      document.dispatchEvent(domEvent);
  
      console.log('✅ Webflow reinitialized (including forms)');
    } catch (err) {
      console.error('❌ Webflow reinitialization error:', err);
    }
  }
  