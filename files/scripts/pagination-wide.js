	//PAGINATION-FUNCTIONS

	//Pagination is handled by multiple javascript functions since the entire component is quite involved and has to be flexible enough to account for a changing amount of content.
	//This first part determines how many items are rendered on each page of pagination. The more items you show on a page the less pagination pages there will be.
	//The pagination is always calculated off the current page of pagination and how many items have already been "presented" from unordered list where all of the list items are stored.
	//To make sure that every item can be searched via a direct # link for direct linking to a list item we include an item id declaration.
	const list = document.getElementById("searchWideUL");
	const items = list.querySelectorAll("li");

	const idToIndexMap = new Map();
  
	items.forEach((item, index) => {
		if (item.id) {
			idToIndexMap.set(item.id, index);
		}
	});
  
	const pagination = document.getElementById("pagination");

	const itemsPerPage = 10;
	let currentPage = 1;

	function showPage(page) {
		currentPage = page;

		const start = (page - 1) * itemsPerPage;
		const end = start + itemsPerPage;

		items.forEach((item, index) => {
			item.style.display = (index >= start && index < end) ? "list-item" : "none";
		});

		renderPagination();
	}

	//This dictates how many pagination page numbers are visible at any given time. Increase the number to add more page number buttons or decrease to display fewer.
	function renderPagination() {
	const totalPages = Math.ceil(items.length / itemsPerPage);
	const maxVisible = 8;
	pagination.innerHTML = "";

	let startPage = Math.max(1, currentPage - Math.floor(maxVisible / 2));
	let endPage = startPage + maxVisible - 1;

	if (endPage > totalPages) {
		endPage = totalPages;
		startPage = Math.max(1, endPage - maxVisible + 1);
	}

		//Navigation button for returning to the previous page of pagination. Change the character(s) in "textContent" to change the rendered symbol.
		const prev = document.createElement("button");
		prev.textContent = "\u25C0";
		prev.disabled = currentPage === 1;
		prev.onclick = () => showPage(currentPage - 1);
		pagination.appendChild(prev);

		//Determines where the ellipsis should be placed on the starting (left) side of listed pagination page numbers in relation to the current pagination page number range you are viewing.
		if (startPage > 1) {
			addPageButton(1);
			if (startPage > 2) {
				addEllipsis();
			}
  		}

		// Shows a number of pages around the current page number that you are viewing. This number is determined by const maxVisible that is declared in an earlier part of the function.
		for (let i = startPage; i <= endPage; i++) {
			addPageButton(i);
		}

		//Determines where the ellipsis should be placed on the ending (right) side of listed pagination page numbers in relation to the current pagination page number range you are viewing.
		if (endPage < totalPages) {
			if (endPage < totalPages - 1) {
				addEllipsis();
			}
			addPageButton(totalPages);
		}

		//Navigation button for going to the next page of pagination. Change the character(s) in "textContent" to change the rendered symbol.
		const next = document.createElement("button");
		next.textContent = "\u25B6";
		next.disabled = currentPage === totalPages;
		next.onclick = () => showPage(currentPage + 1);
		pagination.appendChild(next);
	}


	//This function adds the placeholder ellipsis that stand in for a range of page numbers that are not presently being displayed within the range of visible page numbers.
	//The bullet points being used in textContent are written in JS unicode escape. You can find a list of unicode IDs that look like U+XXXX where XXXX is the ID.
	//Then take that XXXX ID and format it into \uXXXX which will be a JS safe escaped way to show the symbol.
	function addEllipsis() {
		const span = document.createElement("span");
		span.textContent = "\u2022\u2022\u2022";
		span.style = "display: inline; padding-top: 24px; padding-top: 24px; text-decoration: none; background-color: var(--primary-color); flex-grow: 1; border: none; border-radius: 50px; font-family: helvetica, arial, sans-serif; font-size: 26px; font-weight: 700; color: var(--secondary-color); text-align: center;";
		pagination.appendChild(span);
	}
  
	//Determines the current page being viewed out of the limited pagination range of visible page numbers.
	function addPageButton(page) {
		const btn = document.createElement("button");
		btn.textContent = page;

		if (page === currentPage) {
			btn.classList.add("active");
			btn.disabled = true;
		} else {
			btn.onclick = () => showPage(page);
		}

		pagination.appendChild(btn);
	}

	//This makes sure that the pagination component starts at the first page. If you want it to default to another paginated page number, then change the value to 3, 10, or whatever page number you'd like.
	function handleHashNavigation() {
		const hash = window.location.hash; 
		if (!hash) {
			showPage(1);
			return;
		}

		const id = hash.substring(1); 
		const index = idToIndexMap.get(id);

		if (index === undefined) {
			showPage(1);
			return;
		}

		const page = Math.floor(index / itemsPerPage) + 1;

		showPage(page, true);

		//Ensures the DOM updates correctly before scrolling to the request.
		requestAnimationFrame(() => {
			const el = document.getElementById(id);
			if (el) {
				el.scrollIntoView({ behavior: "smooth", block: "center" });
			}
		});
	}

	//Enables direct linking by ID via address updates.
	handleHashNavigation();
  
	window.addEventListener("hashchange", handleHashNavigation);
  
	//Saves the current scroll of a page before it changes and creates a new history entry. This also ensures that by default, clicking pagination buttons will return the user to the top of the list.
	//This also ensures that any preexisting hash gets preserved if it is already a part of the URL. Those hashes are the item IDs mentioned earlier in the pagination functions.
	function showPage(page) {
		history.replaceState(
			{ page: currentPage, scrollY: window.scrollY },
			""
		);

		currentPage = page;

		const url = new URL(window.location);
		url.searchParams.set("page", page);

		url.hash = window.location.hash;

		history.pushState({ page, scrollY: 0 }, "", url);

		const start = (page - 1) * itemsPerPage;
		const end = start + itemsPerPage;

		items.forEach((item, index) => {
			item.style.display = (index >= start && index < end)
				? "list-item"
				: "none";
		});

		renderPagination();

		window.scrollTo({ top: 0, behavior: "auto" });
	}

	//Allows for updating the URL hash without jumping to the section of the search results containing the ID.  
	items.forEach((item) => {
		if (!item.id) return;

		item.addEventListener("click", () => {
			history.replaceState(null, "", "#" + item.id);
		});
	});
  
	//Returns the proper behavior depending on whether an item id hash is present or not.
	window.addEventListener("popstate", (event) => {

		if (window.location.hash) {
			handleHashNavigation();
			return;
		}

		if (!event.state) return;

		const { page, scrollY } = event.state;

		if (page) {
			showPage(page, true);
		}

		requestAnimationFrame(() => {
			window.scrollTo({
				top: scrollY || 0,
				behavior: "auto"
			});
		});
	});