import React from "react";
import ReactSelect from "react-select";

import LeftPagiationArrow from "../../util/Assets/Icon/leftArrow.png";
import RightPaginationArrow from "../../util/Assets/Icon/rightArrow.png";
import { pageSizeOption } from "../../util/util";

import style from "./pagination.module.scss";

function Pagination({
  pageSize,
  currentPage,
  totalDocument,
  onPageSizeChange,
  lastPage,
  onLeftClick,
  onRightClick,
  onChange,
}) {
  return (
    <div className={style.bottomParentContainer}>
      <div className={style.bottomContainer}>
        <div className={style.inforContainer}>
          <div className={style.leftContainer}>
            <div className={style.labelContaine}>
              <label className={style.paginationLabel}>Showing </label>
              <label className={style.paginationLabel}>
                {pageSize * (currentPage - 1) + 1}
              </label>
              <label className={style.paginationLabel}>to</label>
              <label className={style.paginationLabel}>
                {currentPage * pageSize}
              </label>
              <label className={style.paginationLabel}>of</label>
              {totalDocument}
            </div>
            <div className={style.labelContaine}>
              <label>Page Size</label>
              <ReactSelect
                menuPlacement="top"
                className={style.pageFilter}
                value={pageSize}
                placeholder={pageSize}
                options={pageSizeOption}
                defaultValue={pageSize}
                onChange={({ value }) => onPageSizeChange(value || 0)}
              />
            </div>
          </div>
          <div className={style.rightContainer}>
            <div className={style.labelContaine}>
              <label className={style.paginationLabel}>Page</label>
              <label className={style.paginationLabel}>{currentPage}</label>
              <label className={style.paginationLabel}> of</label>
              {lastPage}
            </div>
            <div className={style.arrowContainer}>
              <img
                src={LeftPagiationArrow}
                alt="left arrow"
                className={style.paginationArrow}
                onClick={() => currentPage > 1 && onLeftClick(currentPage - 1)}
              />
              <input
                type="number"
                value={currentPage}
                className={style.paginationInput}
                onChange={(e) => onChange(e.target.value)}
              />
              <img
                src={RightPaginationArrow}
                alt="Right arrow"
                className={style.paginationArrow}
                onClick={() =>
                  currentPage < lastPage && onRightClick(currentPage + 1)
                }
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Pagination;
