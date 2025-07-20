import styled from 'styled-components';

export const FilterdStyled = styled.section`
  /* padding: 24px 0 24px 0;
  border-bottom: 1px solid #e6e6e6;

  .filter-dropdown-wrap {
    display: flex;
    gap: 14px;
    flex-wrap: wrap;
  }

  .dropdown {
    &.filter-dropdown {
      .btn {
        background-color: white;
        color: #4d4d4d;
        padding: 12px 16px 12px 16px;
        font-size: 16px;
        font-weight: 500;
        border: 1px solid #f2f2f2;
        display: flex;
        align-items: center;
        border-radius: 8px;

        &::after {
          border: 0;
          content: '\f107';
          font-family: 'Font Awesome 6 Pro';
          margin: 0 0 0 10px;
          transition: all 0.3s;
        }

        &.show::after {
          transform: rotateX(180deg);
        }

        &:focus {
          background-color: white;
          color: #4d4d4d;
          border: 1px solid #f2f2f2;
        }
      }

      .dropdown-menu {
        &.filter-dropdown-menu {
          padding: 18px 24px;
          border-radius: 10px;
          box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.08);
          border: 0;
          transform: translate(0px, 60px) !important;
          z-index: 99;
          inset: 0px auto auto 0px !important;

          li {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-top: 14px;

            .dropdown-item {
              padding: 0;
              width: auto;
              font-size: 16px;
              font-weight: 400;
              color: #333333;
              display: flex;
              align-items: center;

              &:hover {
                background-color: transparent;
              }

              input {
                cursor: pointer;
              }
            }

            .filter-checkbox {
              margin-right: 12px;
            }

            .filter-count {
              font-size: 14px;
              font-weight: 400;
              color: #b3b3b3;
            }

            .color-filter {
              width: 15px;
              height: 15px;
              border: 1px solid #e6e6e6;
              border-radius: 50%;
              margin-right: 12px;
            }
          }
        }

        &.sort-menu {
          width: 270px;
        }

        &.price-range-menu {
          width: 314px;
        }

        &.seats-menu {
          width: 314px;
        }
      }

      .more-filter-btn::after {
        display: none;
      }

      .more-filter-btn::before {
        content: '\f1de';
        font-family: 'Font Awesome 6 Pro';
        margin: 0 10px 0 0;
        font-size: 14px;
      }
    }
  }

  .offcanvas {
    &.more-filter-side {
      padding-top: 0;

      .accordion-item {
        border: 0;
        border-bottom: 1px dashed #cccc;
        padding: 15px 0 15px 0;

        .accordion-button {
          background-color: white;
          display: flex;
          align-items: center;
          font-size: 18px;
          font-weight: 500;
          color: #333333;
          padding: 11px 6px 12px 0;

          &::after {
            display: flex;
            align-items: center;
            justify-content: center;
            background: none;
            content: '\f107';
            font-family: 'Font Awesome 6 Pro';
            height: auto;
            width: auto;
            color: #000;
            font-size: 15px;
          }

          .offcanvas-body {
            padding: 24px 25px 24px 25px;

            .filter-dropdown-menu {
              padding: 12px 8px 8px 15px;
              box-shadow: none;
              transform: translate(0, 0) !important;
              margin: 0;
              border-left: 1px solid #f8f8f8;
              border-radius: 0;

              input[type='radio'] {
                margin-right: 12px;
              }
            }
          }

          &.collapsed {
            box-shadow: none;
            color: #333333;
          }

          &:focus {
            box-shadow: none;
          }
        }

        .accordion-body {
          padding: 0;
        }
      }
    }
  }

  .side-filter-btn-wrap {
    display: flex;
    justify-content: space-between;
    padding: 15px 25px 15px 25px;
    border: 1px solid #f2f2f2;

    .btn {
      width: 215px;
      padding: 18px 0;
      display: inline-block;

      &::after {
        display: none;
      }
    }

    .cancel-filter {
      background-color: #e6e6e6;
      color: #7f7f7f;
    }
  } */
`;

export const SidebarDropdownStyle = styled.div`
  /* .offcanvas-header {
    background-color: #333;
    color: white;
    padding: 15px;
    border-bottom: 1px solid #444;
  }

  .offcanvas-title {
    font-size: 18px;
    font-weight: 600;
  }

  .btn-close {
    font-size: 1.5rem;
    color: white;
  }

  .offcanvas-body {
    padding: 15px;
  }

  .accordion {
    margin-bottom: 20px;
  }

  .accordion-item {
    margin-bottom: 10px;
  }

  .accordion-button {
    background-color: #333;
    color: white;
    border: 1px solid #333;
    border-radius: 5px;
    padding: 10px;
    text-align: left;
    width: 100%;
  }

  .accordion-body {
    padding: 10px;
  }

  .filter-dropdown-menu {
    list-style: none;
    padding: 0;
  }

  .dropdown-item {
    display: flex;
    align-items: center;
    padding: 5px;
    cursor: pointer;
  }

  .filter-checkbox {
    margin-right: 8px;
  }

  .filter-count {
    margin-left: auto;
    color: #999;
  }

  .side-filter-btn-wrap {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
  }

  .view-filter {
    background-color: #333;
    color: white;
    padding: 10px;
    border: 1px solid #333;
    border-radius: 5px;
    cursor: pointer;
  }

  .cancel-filter {
    background-color: #999;
    color: white;
    padding: 10px;
    border: 1px solid #999;
    border-radius: 5px;
    cursor: pointer;
  } */
`;

// Use this styled component in your SidebarDropdown component
