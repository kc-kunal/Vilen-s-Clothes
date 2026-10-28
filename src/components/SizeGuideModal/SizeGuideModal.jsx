import React from 'react';
import { useShop } from '../../context/ShopContext';
import './SizeGuideModal.css';

export const SizeGuideModal = () => {
  const { isSizeGuideOpen, closeSizeGuide } = useShop();

  if (!isSizeGuideOpen) return null;

  return (
    <div className="size-modal-backdrop" onClick={closeSizeGuide}>
      <div className="size-modal-card p-4" onClick={(e) => e.stopPropagation()}>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h3 className="modal-title font-weight-bold mb-0">
            <i className="bi bi-rulers me-2 text-danger"></i>OVERSIZED FIT SIZE GUIDE
          </h3>
          <button className="btn-close" onClick={closeSizeGuide}></button>
        </div>

        <p className="small text-muted mb-3">
          All measurements are in inches. Our oversized collection features a relaxed boxy fit with dropped shoulders.
        </p>

        <div className="table-responsive mb-3">
          <table className="table table-bordered text-center size-table mb-0">
            <thead>
              <tr>
                <th>Size</th>
                <th>Chest (Round)</th>
                <th>Length</th>
                <th>Shoulder Drop</th>
                <th>Recommended Height</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>S</strong></td>
                <td>42"</td>
                <td>28"</td>
                <td>21"</td>
                <td>5'3" - 5'6"</td>
              </tr>
              <tr className="table-active">
                <td><strong>M</strong></td>
                <td>44"</td>
                <td>29"</td>
                <td>22"</td>
                <td>5'6" - 5'9"</td>
              </tr>
              <tr className="table-warning">
                <td><strong>L (Most Popular)</strong></td>
                <td>46"</td>
                <td>30"</td>
                <td>23"</td>
                <td>5'9" - 6'0"</td>
              </tr>
              <tr>
                <td><strong>XL</strong></td>
                <td>48"</td>
                <td>31"</td>
                <td>24"</td>
                <td>6'0" - 6'3"</td>
              </tr>
              <tr>
                <td><strong>XXL</strong></td>
                <td>50"</td>
                <td>32"</td>
                <td>25"</td>
                <td>6'2"+</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="fit-tip-box p-3 rounded-3 bg-light border small">
          <strong>⚡ Fit Pro-Tip:</strong> If you love the exaggerated boxy streetwear aesthetic seen on our models, order your standard regular size! If you prefer a tailored regular fit, order 1 size down.
        </div>

        <button className="btn btn-dark w-100 rounded-pill mt-3 fw-bold" onClick={closeSizeGuide}>
          Got it, Close Guide
        </button>
      </div>
    </div>
  );
};
