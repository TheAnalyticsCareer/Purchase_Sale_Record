import React from "react";
import { useFormik } from "formik";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SaleDept = () => {
  const myFormik = useFormik({
    initialValues: {
      sale_date: "",
      sale_type: "",
      sale_product: "",
      sale_person: "",
      sale_customer: "",
      sale_amount: "",
      sale_commission: "",
      payment_type: "",
      payment_condition: "",
      payment_date: "",
    },

    onSubmit: async (values) => {
      try {
        const token = localStorage.getItem("token");
        const companyName = localStorage.getItem("companyName");

        if (!token) {
          toast.warn("You need to be logged in to submit sale entries.");
          return;
        }

        await axios.post(
          `https://purchase-sale-logic.onrender.com/sales/salesEntry/${companyName}`,
          values,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        myFormik.resetForm();
        toast.success("Sale entry recorded successfully!");
      } catch (err) {
        console.log(err);
        toast.error("Failed to record sale entry. Please try again.");
      }
    },
  });

  return (
    <div className="container-fluid" style={{ backgroundColor: '#F1F5FC', minHeight: '100vh', padding: '2rem' }}>
      <div className="row justify-content-center">
        <div className="col-lg-8 col-md-10 col-sm-12">
          <div className="card border-0 shadow-sm" style={{ borderRadius: '12px' }}>
            <div className="card-header" style={{ 
              backgroundColor: '#795FCD', 
              color: '#FFFFFF',
              padding: '1.25rem 1.5rem',
              borderRadius: '12px 12px 0 0'
            }}>
              <h2 className="h5 mb-0">
                <i className="bi bi-currency-dollar me-2"></i>
                Sales Entry
              </h2>
              <p className="mb-0 mt-1" style={{ opacity: 0.9 }}>
                Fill in the details of your sales transaction
              </p>
            </div>

            <div className="card-body" style={{ padding: '1.5rem' }}>
              <form onSubmit={myFormik.handleSubmit}>
                <div className="row">
                  {/* Left Column */}
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label htmlFor="sale_date" className="form-label fw-medium">
                        Sale Date <span className="text-danger">*</span>
                      </label>
                      <input
                        type="date"
                        className="form-control"
                        id="sale_date"
                        name="sale_date"
                        value={myFormik.values.sale_date}
                        onChange={myFormik.handleChange}
                        style={{ borderRadius: '6px' }}
                        required
                      />
                    </div>

                    <div className="mb-3">
                      <label htmlFor="sale_type" className="form-label fw-medium">
                        Sale Type <span className="text-danger">*</span>
                      </label>
                      <select
                        className="form-select"
                        id="sale_type"
                        name="sale_type"
                        value={myFormik.values.sale_type}
                        onChange={myFormik.handleChange}
                        style={{ borderRadius: '6px' }}
                        required
                      >
                        <option value="">Select Type</option>
                        <option value="Retail">Retail</option>
                        <option value="Wholesale">Wholesale</option>
                        <option value="Online">Online</option>
                        <option value="Service">Service</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>

                    <div className="mb-3">
                      <label htmlFor="sale_product" className="form-label fw-medium">
                        Product/Service <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="sale_product"
                        name="sale_product"
                        placeholder="Enter product or service name"
                        value={myFormik.values.sale_product}
                        onChange={myFormik.handleChange}
                        style={{ borderRadius: '6px' }}
                        required
                      />
                    </div>

                    <div className="mb-3">
                      <label htmlFor="sale_person" className="form-label fw-medium">
                        Sales Person <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="sale_person"
                        name="sale_person"
                        placeholder="Who made this sale?"
                        value={myFormik.values.sale_person}
                        onChange={myFormik.handleChange}
                        style={{ borderRadius: '6px' }}
                        required
                      />
                    </div>
                  </div>

                  {/* Right Column */}
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label htmlFor="sale_customer" className="form-label fw-medium">
                        Customer <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="sale_customer"
                        name="sale_customer"
                        placeholder="Customer name"
                        value={myFormik.values.sale_customer}
                        onChange={myFormik.handleChange}
                        style={{ borderRadius: '6px' }}
                        required
                      />
                    </div>

                    <div className="mb-3">
                      <label htmlFor="sale_amount" className="form-label fw-medium">
                        Amount (₹) <span className="text-danger">*</span>
                      </label>
                      <div className="input-group">
                        <span className="input-group-text" style={{ borderRadius: '6px 0 0 6px' }}>₹</span>
                        <input
                          type="number"
                          className="form-control"
                          id="sale_amount"
                          name="sale_amount"
                          placeholder="0.00"
                          step="0.01"
                          min="0"
                          value={myFormik.values.sale_amount}
                          onChange={myFormik.handleChange}
                          style={{ borderRadius: '0 6px 6px 0' }}
                          required
                        />
                      </div>
                    </div>

                    <div className="mb-3">
                      <label htmlFor="sale_commission" className="form-label fw-medium">
                        Commission (₹)
                      </label>
                      <div className="input-group">
                        <span className="input-group-text" style={{ borderRadius: '6px 0 0 6px' }}>₹</span>
                        <input
                          type="number"
                          className="form-control"
                          id="sale_commission"
                          name="sale_commission"
                          placeholder="0.00"
                          step="0.01"
                          min="0"
                          value={myFormik.values.sale_commission}
                          onChange={myFormik.handleChange}
                          style={{ borderRadius: '0 6px 6px 0' }}
                        />
                      </div>
                    </div>

                    <div className="mb-3">
                      <label htmlFor="payment_type" className="form-label fw-medium">
                        Payment Type <span className="text-danger">*</span>
                      </label>
                      <select
                        className="form-select"
                        id="payment_type"
                        name="payment_type"
                        value={myFormik.values.payment_type}
                        onChange={myFormik.handleChange}
                        style={{ borderRadius: '6px' }}
                        required
                      >
                        <option value="">Select Payment Type</option>
                        <option value="Cash">Cash</option>
                        <option value="Credit">Credit</option>
                        <option value="Bank Transfer">Bank Transfer</option>
                        <option value="Cheque">Cheque</option>
                        <option value="Digital Payment">Digital Payment</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Bottom Row - Full Width */}
                <div className="row">
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label htmlFor="payment_condition" className="form-label fw-medium">
                        Payment Terms <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="payment_condition"
                        name="payment_condition"
                        placeholder="e.g., Net 30, Advance 50%"
                        value={myFormik.values.payment_condition}
                        onChange={myFormik.handleChange}
                        style={{ borderRadius: '6px' }}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-4">
                      <label htmlFor="payment_date" className="form-label fw-medium">
                        Payment Due Date <span className="text-danger">*</span>
                      </label>
                      <input
                        type="date"
                        className="form-control"
                        id="payment_date"
                        name="payment_date"
                        value={myFormik.values.payment_date}
                        onChange={myFormik.handleChange}
                        style={{ borderRadius: '6px' }}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="d-grid mt-4">
                  <button
                    type="submit"
                    className="btn py-2 fw-medium"
                    style={{ 
                      backgroundColor: '#795FCD',
                      color: 'white',
                      borderRadius: '6px',
                      border: 'none'
                    }}
                  >
                    <i className="bi bi-check-circle me-2"></i>
                    Submit Sales Entry
                  </button>
                </div>
              </form>
            </div>

            <div className="card-footer" style={{ 
              backgroundColor: '#F9FAFE',
              color: '#6c757d',
              fontSize: '0.875rem',
              padding: '1rem 1.5rem',
              borderTop: '1px solid rgba(0,0,0,0.05)',
              borderRadius: '0 0 12px 12px'
            }}>
              <div className="text-center">
                <small>
                  All fields marked with <span className="text-danger">*</span> are required
                </small>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
};

export default SaleDept;